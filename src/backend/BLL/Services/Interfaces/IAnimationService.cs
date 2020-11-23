using BLL.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL.Services
{
    public interface IAnimationService
    {
        Task<List<AnimationDto>> GetAnimations(string searchTerm);

        Task<AnimationDto> GetAnimation(long id);

        Task<AnimationDto> AddAnimation(NewAnimationDto newAnimation);

        Task<AnimationDto> UpdateAnimation(AnimationDto updatedAnimation);

        Task DeleteAnimation(long animationId);

        Task<CommentDto> AddComment(CommentDto newComment);

        Task<string> GetAnimationFileName(long animationId);
    }
}