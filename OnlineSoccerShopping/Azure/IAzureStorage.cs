namespace OnlineSoccerShopping.Azure
{
    public interface IAzureStorage
    {
        Task<string> UploadFileAsync(IFormFile file);
        Task<string> GetImageAsync(string imageName);
        Task DeleteFileAsync(string fileName);
    }
}
