using API.Attributes;
using API.Controllers.Base;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    public class TestController : BaseController
    {

        /// <summary>
        /// Test API without authentication.
        /// </summary>
        /// <returns></returns>
        [HttpGet("noauth")]
        public ActionResult<string> TestNoauth()
        {
            return Ok("API is working.");
        }

        /// <summary>
        /// Test API with authentication.
        /// </summary>
        /// <returns></returns>
        [HttpGet("auth")]
        [Authorize]
        public ActionResult<string> TestAuth()
        {
            return Ok($"Authenticated. Hello {CurrentUser.UserName}!");
        }

        /// <summary>
        /// Test API with authentication, admin role.
        /// </summary>
        /// <returns></returns>
        [HttpGet("admin-auth")]
        [Authorize(Role: "Administrator")]
        public ActionResult<string> TestAdminAuth()
        {
            return Ok($"Authenticated. Hello {CurrentUser.UserName}! You are an admin Harry!");
        }

    }
}
