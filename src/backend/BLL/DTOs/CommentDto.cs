using DAL.Entities;
using System;

namespace BLL.DTOs
{
    public class CommentDto
    {
        public long Id { get; set; }

        public long AnimationId { get; set; }

        public string AuthorId { get; set; }

        public string AuthorName { get; set; }

        public DateTime Timestamp { get; set; }

        public string Content { get; set; }

    }
}
