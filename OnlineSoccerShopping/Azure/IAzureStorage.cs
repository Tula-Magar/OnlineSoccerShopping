namespace OnlineSoccerShopping.Azure
{
    public interface IAzureStorage
    {
        Task<string> UploadFileAsync(IFormFile file);
        Task<byte[]> GetImageAsync(string fileName);
        Task DeleteFileAsync(string fileName);
    }
}
