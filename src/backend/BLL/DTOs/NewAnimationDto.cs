using Microsoft.AspNetCore.Http;

namespace BLL.DTOs
{
    public class NewAnimationDto
    {
        public string Title { get; set; }

        public IFormFile AnimationFile { get; set; }

    }
}
