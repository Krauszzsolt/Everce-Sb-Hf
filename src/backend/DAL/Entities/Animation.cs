using System.Collections.Generic;

namespace DAL.Entities
{
    public class Animation
    {
        public long Id { get; set; }

        public string Title { get; set; }

        public string AnimationFile { get; set; }

        public string PreviewImageFile { get; set; }

        // navigation properties

        public List<Comment> Comments { get; set; }

    }
}
