using System;
using System.IO;
using System.Runtime.InteropServices;

namespace CAFFTest
{
    class Program
    {
        [DllImport("../../../../../CAFFParserLibrary/x64/Debug/CAFFParserLibrary.dll", CallingConvention = CallingConvention.Cdecl, CharSet = CharSet.Unicode)]
        public static extern void getPreviewOfCaff(IntPtr preview, IntPtr file, long len, long size);

        static void Main(string[] args)
        {
            GeneratePreview("1", 500);

            GeneratePreview("2", 1000);

            GeneratePreview("1", 1000);

            Console.WriteLine("Done.");
        }

        static void GeneratePreview(string number, int size)
        {

            // read CAFF file
            var inputFile = File.ReadAllBytes($"../../../{number}.caff");
            var previewAsByteArray = new byte[size * size * 4 + 54];

            IntPtr filePtr = Marshal.AllocHGlobal(sizeof(byte) * inputFile.Length);
            IntPtr previewPtr = Marshal.AllocHGlobal(sizeof(byte) * (size * size * 4 + 54));

            Marshal.Copy(inputFile, 0, filePtr, inputFile.Length);

            getPreviewOfCaff(previewPtr, filePtr, inputFile.Length, size);

            Marshal.Copy(previewPtr, previewAsByteArray, 0, previewAsByteArray.Length);

            Marshal.FreeHGlobal(filePtr);
            Marshal.FreeHGlobal(previewPtr);

            // write bmp file
            File.WriteAllBytes($"../../../previews/preview{number}.bmp", previewAsByteArray);
        }

    }
}
