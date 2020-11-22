using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;

namespace BLL.Services
{
    public interface IFileManager
    {
        Task<string> SaveFile(IFormFile file, string directory);

        Task<string> SaveFile(Stream stream, string fileName, string directory);

        byte[] GeneratePreview(byte[] file);

    }
}
