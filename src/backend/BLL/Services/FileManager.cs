using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class FileManager : IFileManager
    {
        private const int PREVIEW_SIZE = 500;

        private readonly IWebHostEnvironment _env;

        public FileManager(IWebHostEnvironment env)
        {
            _env = env;
        }

        public async Task<string> SaveFile(IFormFile file, string directory)
        {
            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                return await SaveFile(stream, file.FileName, directory);
            }
            
            //return await SaveFile(file.OpenReadStream(), file.FileName, directory);
        }

        public async Task<string> SaveFile(Stream stream, string fileName, string directory)
        {
            var path = Path.Combine(_env.WebRootPath, directory);
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            var newFileName = Path.GetFileName($"{Guid.NewGuid()}.{fileName.Split(".").Last()}");
            using (FileStream fstream = new FileStream(Path.Combine(path, newFileName), FileMode.Create))
            {
                stream.Seek(0, SeekOrigin.Begin);
                await stream.CopyToAsync(fstream);
            }

            return newFileName;
        }

        // preview parser function
#if X86
        [DllImport("../../../../dependencies/CAFFParserLibrary/x86/CAFFParserLibrary.dll", CallingConvention = CallingConvention.Cdecl, CharSet = CharSet.Unicode)]
#else
        [DllImport("../../../../dependencies/CAFFParserLibrary/x64/CAFFParserLibrary.dll", CallingConvention = CallingConvention.Cdecl, CharSet = CharSet.Unicode)]
#endif
        private static extern void getPreviewOfCaff(IntPtr preview, IntPtr file, long len, long size);

        public byte[] GeneratePreview(byte[] file)
        {
            var preview = new byte[PREVIEW_SIZE * PREVIEW_SIZE * 4 + 54];

            IntPtr fileHandle = Marshal.AllocHGlobal(sizeof(byte) * file.Length);
            IntPtr previewHandle = Marshal.AllocHGlobal(sizeof(byte) * (PREVIEW_SIZE * PREVIEW_SIZE * 4 + 54));

            Marshal.Copy(file, 0, fileHandle, file.Length);

            getPreviewOfCaff(previewHandle, fileHandle, file.Length, PREVIEW_SIZE);

            Marshal.Copy(previewHandle, preview, 0, preview.Length);

            Marshal.FreeHGlobal(fileHandle);
            Marshal.FreeHGlobal(previewHandle);

            return preview;
        }
    }
}
