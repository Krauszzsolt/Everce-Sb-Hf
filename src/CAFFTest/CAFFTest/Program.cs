using System;
using System.IO;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Runtime.InteropServices.ComTypes;

namespace CAFFTest
{
    class Program
    {
        [DllImport("../../../../dependencies/CrySysParser.dll", EntryPoint = "getPreviewOfCaff")]
        public static extern IntPtr getPreviewOfCaff(IStream file, int size);


        static void Main(string[] args)
        {

            var inputFile = File.ReadAllBytes("../../../1.caff");
            var stream = new MemoryStream(inputFile);
            //FileStream stream = File.OpenRead("../../../1.caff");
            var output = getPreviewOfCaff(null, 1000);
            Console.WriteLine("Hello World!");
        }
    }
}
