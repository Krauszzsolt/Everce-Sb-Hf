using DAL.Entities;
using System.Collections.Generic;

namespace BLL.DTOs
{
    public class AnimationDto
    {
        // default constructor for JSON parse
        public AnimationDto()
        {

        }

        public AnimationDto(Animation _animation)
        {
            Id = _animation.Id;
            Title = _animation.Title;
            PreviewImage = _animation.PreviewImageFile;
        }

        public long Id { get; set; }

        public string Title { get; set; }

        public string PreviewImage { get; set; }
        
        public List<CommentDto> Comments { get; set; }

    }
}
