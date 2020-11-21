using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices;
using System.Runtime.InteropServices.ComTypes;
using System.Text;

namespace CAFFTest
{
    public class IStreamWrapper : IStream
    {
        public IStreamWrapper(Stream stream)
        {
            if (stream == null)
                throw new ArgumentNullException("stream", "Can't wrap null stream.");
            this.stream = stream;
        }

        Stream stream;

        public void Clone(out System.Runtime.InteropServices.ComTypes.IStream ppstm)
        {
            ppstm = null;
        }

        public void Commit(int grfCommitFlags) { }

        public void CopyTo(System.Runtime.InteropServices.ComTypes.IStream pstm,
          long cb, System.IntPtr pcbRead, System.IntPtr pcbWritten)
        { }

        public void LockRegion(long libOffset, long cb, int dwLockType) { }

        public void Read(byte[] pv, int cb, System.IntPtr pcbRead)
        {
            Marshal.WriteInt64(pcbRead, (Int64)stream.Read(pv, 0, cb));
        }

        public void Revert() { }

        public void Seek(long dlibMove, int dwOrigin, System.IntPtr plibNewPosition)
        {
            Marshal.WriteInt64(plibNewPosition, stream.Seek(dlibMove, (SeekOrigin)dwOrigin));
        }

        public void SetSize(long libNewSize) { }

        public void Stat(out System.Runtime.InteropServices.ComTypes.STATSTG pstatstg, int grfStatFlag)
        {
            pstatstg = new System.Runtime.InteropServices.ComTypes.STATSTG();
        }

        public void UnlockRegion(long libOffset, long cb, int dwLockType) { }

        public void Write(byte[] pv, int cb, System.IntPtr pcbWritten) { }
    }
}
