using API.Attributes;
using API.Controllers.Base;
using BLL.DTOs;
using BLL.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AnimationsController : BaseController
    {
        private readonly IAnimationService _animationService;

        public AnimationsController(IAnimationService animationService)
        {
            _animationService = animationService;
        }

        /// <summary>
        /// Browse animations
        /// </summary>
        /// <param name="searchTerm">Search keyword</param>
        /// <returns>Every animation matching the specified filter</returns>
        [HttpGet("")]
        [Authorize]
        public async Task<ActionResult<List<AnimationDto>>> GetAnimations(string searchTerm)
        {
            return await _animationService.GetAnimations(searchTerm);
        }

        /// <summary>
        /// Get a specific animation
        /// </summary>
        /// <param name="id">Id of the animations</param>
        /// <returns>Animation details and comments</returns>
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<AnimationDto>> GetAnimation(long id)
        {
            return await _animationService.GetAnimation(id);
        }

        /// <summary>
        /// Add new animation
        /// </summary>
        /// <param name="newAnimation">New animation data</param>
        /// <returns>Created animation</returns>
        [HttpPost("add")]
        [Authorize]
        public async Task<ActionResult<AnimationDto>> AddAnimation([FromForm] NewAnimationDto newAnimation)
        {
            return await _animationService.AddAnimation(newAnimation);
        }

        /// <summary>
        /// Edit an animation
        /// </summary>
        /// <param name="id">Id of the animation to update</param>
        /// <param name="newTitle">New title of the animation</param>
        /// <returns>Updated animation</returns>
        [HttpPost("{id}/edit")]
        [Authorize(Role: "Administrator")]
        public async Task<ActionResult<AnimationDto>> UpdateAnimation(long id, [FromBody] string newTitle)
        {
            return await _animationService.UpdateAnimation(new AnimationDto()
            {
                Id = id,
                Title = newTitle
            });
        }

        /// <summary>
        /// Delete an animation
        /// </summary>
        /// <param name="id">Id of the animation to delete</param>
        /// <returns></returns>
        [HttpPost("{id}/delete")]
        [Authorize("Administrator")]
        public async Task<ActionResult> DeleteAnimation(long id)
        {
            await _animationService.DeleteAnimation(id);
            return Ok("Animation deleted successfully.");
        }


        /// <summary>
        /// Add a comment to an animation
        /// </summary>
        /// <param name="id">Id of the animation</param>
        /// <param name="content">Comment text</param>
        /// <returns>Created comment</returns>
        [HttpPost("{id}/comment")]
        [Authorize]
        public async Task<ActionResult<CommentDto>> AddComment(long id, [FromBody] string content)
        {
            return await _animationService.AddComment(new CommentDto()
            {
                AnimationId = id,
                AuthorId = CurrentUser.Id,
                Timestamp = DateTime.Now,
                Content = content,
            });
        }
    }
}
