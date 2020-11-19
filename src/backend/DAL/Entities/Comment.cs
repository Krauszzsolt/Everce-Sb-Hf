using System;

namespace DAL.Entities
{
    public class Comment
    {
        public long Id { get; set; }

        public long AnimationId { get; set; }

        public string AuthorId { get; set; }

        public DateTime Timestamp { get; set; }

        public string Content { get; set; }

        // navigation properties

        public Animation Animation { get; set; }

        public ApplicationUser Author { get; set; }
    }
}
