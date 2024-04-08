using Microsoft.AspNetCore.Mvc;
using credit_cards_manager.Models;
using credit_cards_manager.Services;
using Microsoft.AspNetCore.Authorization;

namespace credit_cards_manager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    //[Authorize] add this line to require authentication for all routes in this controller
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {
            var token = _userService.Authenticate(request);

            if (token == null)
                return Unauthorized();

            return Ok(new { token });
        }
    }
}