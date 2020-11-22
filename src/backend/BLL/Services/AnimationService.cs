using BLL.DTOs;
using DAL.Data;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class AnimationService : IAnimationService
    {
        private readonly ApplicationDbContext _context;
        private readonly IFileManager _fileManager;

        public AnimationService(ApplicationDbContext context, IFileManager fileManager)
        {
            _context = context;
            _fileManager = fileManager;
        }

        public async Task<List<AnimationDto>> GetAnimations(string searchTerm)
        {
            var query = _context.Animations.AsQueryable();
            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                query = query.Where(a => a.Title.Contains(searchTerm));
            }
            var result = await query.ToListAsync();
            return result.Select(a => new AnimationDto(a)).ToList();
        }

        public async Task<AnimationDto> GetAnimation(long id)
        {
            var result = await _context.Animations.Where(a => a.Id == id).Select(a => new AnimationDto()
            {
                Id = a.Id,
                Title = a.Title,
                PreviewImage = a.PreviewImageFile,
                Comments = a.Comments.Select(c => new CommentDto()
                {
                    Id = c.Id,
                    AnimationId = c.AnimationId,
                    AuthorId = c.AuthorId,
                    AuthorName = c.Author.UserName,
                    Timestamp = c.Timestamp,
                    Content = c.Content
                }).ToList()
            }).FirstOrDefaultAsync();
            return result;
        }

        public async Task<AnimationDto> AddAnimation(NewAnimationDto newAnimation)
        {
            var animationDir = "animations";
            var previewDir = "previews";
            var animationFileName = string.Empty;
            var preViewFileName = string.Empty;

            using (var animationStream = new MemoryStream())
            {
                await newAnimation.AnimationFile.CopyToAsync(animationStream);

                animationFileName = await _fileManager.SaveFile(animationStream, newAnimation.AnimationFile.FileName, animationDir);
                
                var previewFile = _fileManager.GeneratePreview(animationStream.ToArray());

                using var preViewStream = new MemoryStream(previewFile);
                preViewFileName = await _fileManager.SaveFile(preViewStream, "preview.bmp", previewDir);
            }

            var animationToAdd = new Animation()
            {
                Title = newAnimation.Title,
                PreviewImageFile = $"/{previewDir}/{preViewFileName}",
                AnimationFile = animationFileName
            };
            _context.Animations.Add(animationToAdd);
            await _context.SaveChangesAsync();

            var result = await _context.Animations.FindAsync(animationToAdd.Id);
            return new AnimationDto(result);
        }
        
        public async Task<AnimationDto> UpdateAnimation(AnimationDto updatedAnimation)
        {
            var toUpdate = await _context.Animations.FindAsync(updatedAnimation.Id);
            toUpdate.Title = updatedAnimation.Title;
            await _context.SaveChangesAsync();
            var result = await _context.Animations.FindAsync(updatedAnimation.Id);
            return new AnimationDto(result);
        }

        public async Task DeleteAnimation(long animationId)
        {
            var toRemove = await _context.Animations.FindAsync(animationId);
            _context.Animations.Remove(toRemove);
            await _context.SaveChangesAsync();
        }

        public async Task<CommentDto> AddComment(CommentDto newComment)
        {
            var commentToAdd = new Comment()
            {
                AnimationId = newComment.AnimationId,
                AuthorId = newComment.AuthorId,
                Timestamp = newComment.Timestamp,
                Content = newComment.Content
            };
            _context.Comments.Add(commentToAdd);
            await _context.SaveChangesAsync();

            var result = await _context.Comments.Where(c => c.Id == commentToAdd.Id).Select(c => new CommentDto()
            {
                Id = c.Id,
                AnimationId = c.AnimationId,
                AuthorId = c.AuthorId,
                AuthorName = c.Author.UserName,
                Timestamp = c.Timestamp,
                Content = c.Content
            }).FirstOrDefaultAsync();
            return result;
        }

        public async Task<string> GetAnimationFileName(long animationId)
        {
            var animation = await _context.Animations.FindAsync(animationId);
            return animation.AnimationFile;
        }
    }
}
