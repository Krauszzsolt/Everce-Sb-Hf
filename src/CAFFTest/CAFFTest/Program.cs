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
        public static extern IntPtr getPreviewOfCaff(IntPtr file, long len, long size);

        static void Main(string[] args)
        {
            var size = 1000;

            // read CAFF file
            var inputFile = File.ReadAllBytes("../../../1.caff");
            IntPtr filePtr = Marshal.AllocHGlobal(sizeof(int) * inputFile.Length);
            Marshal.Copy(inputFile, 0, filePtr, inputFile.Length);
            var output = getPreviewOfCaff(filePtr, inputFile.Length, size);
            Marshal.FreeHGlobal(filePtr);

            var previewAsByteArray = new byte[size * size * 4 + 54];
            Marshal.Copy(output, previewAsByteArray, 0, previewAsByteArray.Length);

            //Marshal.FreeHGlobal(output);

            //var beg = previewAsByteArray.Take(54).ToArray();
            //var data = previewAsByteArray.Skip(54).Take(previewAsByteArray.Length - 54).ToArray();
            //var reversed = new byte[previewAsByteArray.Length - 54];
            //var len = data.Length - 1;
            //for (int i = 0; i <= len; i+=4)
            //{
            //    reversed[i] = data[len - i - 3];
            //    reversed[i+1] = data[len - i - 2];
            //    reversed[i+2] = data[len - i - 1];
            //    reversed[i+3] = data[len - i];
            //}
            
            
            File.WriteAllBytes("../../../previews/preview1.bmp", previewAsByteArray);

            // test char* return
            // it works
            //var copiedArray = new byte[4];
            //Marshal.Copy(output, copiedArray, 0, 4);
            //var str = Encoding.UTF8.GetString(copiedArray);
            //Console.WriteLine(str);

            Console.WriteLine("Done.");

        }


    }
}
