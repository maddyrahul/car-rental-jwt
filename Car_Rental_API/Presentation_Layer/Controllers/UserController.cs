using Business_Layer.Data_Logic;
using Data_Access_Layer.DTO;
using Data_Access_Layer.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Presentation_Layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserLogic _userService;
        private readonly IUserAuthentication _userAuthentication;

        public UserController(IUserAuthentication userAuthentication, IUserLogic userService)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _userAuthentication = userAuthentication;
        }

        [HttpPost("LoginUser")]
        public async Task<IActionResult> Login([FromBody] NewLoginDto userLoginDto)
        {
            var token = await _userAuthentication.AuthenticateAsync(userLoginDto);

            if (token == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(new { Token = token });
        }

        [HttpPost("RegisterUser")]
        public async Task<IActionResult> Register([FromBody] UserDTO userRegisterDto)
        {
            var token = await _userAuthentication.RegisterAsync(userRegisterDto);

            if (token == null)
            {
                return BadRequest("User registration failed.");
            }

            return Ok(new { Token = token });
        }

        [HttpGet("GetUserDetailById/{id}")]
        public ActionResult<User> GetUserDetailById(int id)
        {
            try
            {
                var userDetails = _userService.GetUserDetailsById(id);

                if (userDetails == null)
                {
                    return NotFound();
                }

                return Ok(userDetails);
            }
            catch (Exception ex)
            {
                // Handle exceptions and return appropriate responses
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
