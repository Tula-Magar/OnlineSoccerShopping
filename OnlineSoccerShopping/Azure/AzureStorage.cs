using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Threading.Tasks;

namespace OnlineSoccerShopping.Azure
{
    public class AzureStorage : IAzureStorage
    {
        private readonly string _connectionString;
        private readonly string _containerName;

        public AzureStorage(string azureStorageConnectionString, string azureStorageContainerName)
        {
            _connectionString = azureStorageConnectionString;
            _containerName = azureStorageContainerName;
        }

        public async Task<string> UploadFileAsync(IFormFile file)
        {
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            Console.WriteLine($"Connection string: {_connectionString}");
            Console.WriteLine($"Container name: {_containerName}");
            // Create a blob client and get a reference to the container
            var blobClient = new BlobServiceClient(_connectionString);
            var containerClient = blobClient.GetBlobContainerClient(_containerName);

            // Upload the file to the container
            using var stream = file.OpenReadStream();
            await containerClient.UploadBlobAsync(fileName, stream);

            // Return the unique name of the file
            return fileName;
        }

        public async Task<byte[]> GetImageAsync(string fileName)
        {
            var blobServiceClient = new BlobServiceClient(_connectionString);
            var containerClient = blobServiceClient.GetBlobContainerClient(_containerName);
            var blobClient = containerClient.GetBlobClient(fileName);

            if (!await blobClient.ExistsAsync())
            {
                throw new FileNotFoundException($"File '{fileName}' not found in Azure Blob Storage container '{_containerName}'.");
            }

            using var streamReader = new MemoryStream();
            await blobClient.DownloadToAsync(streamReader);

            return streamReader.ToArray();
        }

        public async Task DeleteFileAsync(string fileName)
        {
            var blobServiceClient = new BlobServiceClient(_connectionString);
            var containerClient = blobServiceClient.GetBlobContainerClient(_containerName);
            var blobClient = containerClient.GetBlobClient(fileName);
            await blobClient.DeleteIfExistsAsync();
        }
    }
}
