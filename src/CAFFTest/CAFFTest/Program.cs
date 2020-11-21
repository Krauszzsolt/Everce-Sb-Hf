using System;
using System.IO;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Runtime.InteropServices.ComTypes;
using System.Text;

namespace CAFFTest
{
    class Program
    {
        [DllImport("../../../../../CAFFParserLibrary/x64/Debug/CAFFParserLibrary.dll", CallingConvention = CallingConvention.Cdecl, CharSet = CharSet.Unicode)]
        public static extern IntPtr getPreviewOfCaff(IStream file, long size);

        static void Main(string[] args)
        {
            // read CAFF file
            var inputFile = File.ReadAllBytes("../../../1.caff");
            var stream = new MemoryStream(inputFile);
            var wrappedStream = new IStreamWrapper(stream);

            var size = 500;
            var output = getPreviewOfCaff(wrappedStream, size);

            var previewAsByteArray = new byte[size * size * 4 + 54];
            Marshal.Copy(output, previewAsByteArray, 0, previewAsByteArray.Length);
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
