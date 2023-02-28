using Azure;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
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

            var blobClient = new BlobClient(_connectionString, _containerName, fileName);
            using var stream = file.OpenReadStream();
            var contentType = file.ContentType;
            Console.WriteLine($"Content type: {contentType}");

            await blobClient.UploadAsync(stream, new BlobUploadOptions
            {
                HttpHeaders = new BlobHttpHeaders { ContentType = contentType }
            });

            return fileName;
        }

        public async Task<string> GetImageAsync(string imageName)
        {
            var blobServiceClient = new BlobServiceClient(_connectionString);
            var containerClient = blobServiceClient.GetBlobContainerClient(_containerName);
            var blobClient = containerClient.GetBlobClient(imageName);

            var response = await blobClient.DownloadAsync();

            string dataUri = null;
            var contentType = response.Value.ContentType;
            var imageStream = response.Value.Content;

            using var ms = new MemoryStream();
            await imageStream.CopyToAsync(ms);
            var imageBytes = ms.ToArray();
            Console.WriteLine($"Content type: {contentType}, image bytes: {imageBytes.Length}");

            if (contentType == "image/jpeg")
            {
                dataUri = $"data:image/jpeg;base64,{Convert.ToBase64String(imageBytes)}";
            }
            else if (contentType == "image/jpg")
            {
                dataUri = $"data:image/jpg;base64,{Convert.ToBase64String(imageBytes)}";
            }
            else if (contentType == "image/png")
            {
                dataUri = $"data:image/png;base64,{Convert.ToBase64String(imageBytes)}";
            }
            else if (contentType == "image/gif")
            {
                dataUri = $"data:image/gif;base64,{Convert.ToBase64String(imageBytes)}";
            }
            else if (contentType == "image/webp")
            {
                dataUri = $"data:image/webp;base64,{Convert.ToBase64String(imageBytes)}";
            }
            else if (contentType == "image/jfif")
            {
                dataUri = $"data:image/jfif;base64,{Convert.ToBase64String(imageBytes)}";
            }
            else if (contentType == "image/bmp")
            {
                dataUri = $"data:image/bmp;base64,{Convert.ToBase64String(imageBytes)}";
            }

            return dataUri;
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
