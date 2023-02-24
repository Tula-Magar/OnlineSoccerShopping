namespace OnlineSoccerShopping.Azure
{
    public interface IAzureStorage
    {
        Task<string> UploadFileAsync(IFormFile file);
        Task DeleteFileAsync(string fileName);
    }
}
