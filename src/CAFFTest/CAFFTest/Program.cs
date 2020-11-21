using System;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Runtime.InteropServices.ComTypes;
using System.Text;

namespace CAFFTest
{
    class Program
    {
        [DllImport("../../../../../CAFFParserLibrary/x64/Debug/CAFFParserLibrary.dll", CallingConvention = CallingConvention.Cdecl, CharSet = CharSet.Unicode)]
        public static extern void getPreviewOfCaff(IntPtr preview, IntPtr file, long len, long size);

        static void Main(string[] args)
        {
            var size = 1000;

            // read CAFF file
            var inputFile = File.ReadAllBytes("../../../1.caff");
            var previewAsByteArray = new byte[size * size * 4 + 54];

            IntPtr filePtr = Marshal.AllocHGlobal(sizeof(int) * inputFile.Length);
            IntPtr previewPtr = Marshal.AllocHGlobal(sizeof(int) * (size * size * 4 + 54));
            
            Marshal.Copy(inputFile, 0, filePtr, inputFile.Length);

            getPreviewOfCaff(previewPtr, filePtr, inputFile.Length, size);
            
            Marshal.Copy(previewPtr, previewAsByteArray, 0, previewAsByteArray.Length);

            Marshal.FreeHGlobal(filePtr);
            Marshal.FreeHGlobal(previewPtr);

            // write bmp file
            File.WriteAllBytes("../../../previews/preview1.bmp", previewAsByteArray);

            Console.WriteLine("Done.");

        }


    }
}
