using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class FileManager : IFileManager
    {
        private readonly IWebHostEnvironment _env;

        public FileManager(IWebHostEnvironment env)
        {
            _env = env;
        }

        public async Task<string> SaveFile(IFormFile file, string directory)
        {
            var path = Path.Combine(_env.WebRootPath, directory);
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            var fileName = Path.GetFileName($"{Guid.NewGuid()}.{file.FileName.Split(".").Last()}");
            using (FileStream stream = new FileStream(Path.Combine(path, fileName), FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return fileName;
        }
    }
}
