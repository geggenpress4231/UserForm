using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Types.Helper;
using Application.Interface;
using Medfar.Interview.Types;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Types.Dto;

namespace Core.Controllers
{
    [ApiController]
    [Route("/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        // Constructor injection for IUserService to follow the Dependency Injection principle
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // Refactored to use async/await for non-blocking operations and improved scalability
        [HttpGet(Name = "GetUsers")]
        public async Task<IEnumerable<UserDto>> Get([FromQuery] QueryObject query)
        {
            var users = await _userService.GetAll(query);
            return users;
        }

        // Added endpoint to get user by ID for better API usability and specific user retrieval
        [HttpGet("{id:guid}", Name = "GetUserById")]
        public async Task<ActionResult<UserDto>> GetById(Guid id)
        {
            var user = await _userService.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
         
        // Added endpoint for creating a user with validation and exception handling
        [HttpPost(Name = "CreateUser")]
        public async Task<IActionResult> Create([FromBody] CreateUserRequestDto createUserRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _userService.CreateAsync(createUserRequest);
                return Ok(result);
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // Added endpoint for updating user information with validation and exception handling
        [HttpPut("{id:guid}", Name = "UpdateUser")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateUserRequestDto updateUserRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _userService.UpdateAsync(id, updateUserRequest);
                if (result == null)
                {
                    return NotFound();
                }

                return Ok(result);
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // Added endpoint for deleting a user by ID
        [HttpDelete("{id:guid}", Name = "DeleteUser")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var result = await _userService.DeleteAsync(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
