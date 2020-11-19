using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace BLL.Services
{
    public interface IFileManager
    {
        Task<string> SaveFile(IFormFile file, string directory);

    }
}
