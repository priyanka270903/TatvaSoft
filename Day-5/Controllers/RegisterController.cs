using Day_5.Data; // Adjust namespace according to your actual structure
using Day_5.Dtos;
using Day_5.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Day_5.Controllers // Adjust namespace according to your actual structure
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegisterController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly TokenService _tokenService;

        public RegisterController(ApplicationDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost]
        public async Task<IActionResult> Register(UserRegistrationDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Returns 400 with validation errors
            }

            // Check if the email is already registered
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
            if (existingUser != null)
            {
                ModelState.AddModelError("Email", "Email is already registered.");
                return BadRequest(ModelState);
            }

            // Create a new user
            var newUser = new User
            {
                Username = model.Username,
                Email = model.Email,
                PasswordHash = model.Password // In a real application, hash the password before saving
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            // Generate token for the new user
            var token = _tokenService.GenerateToken(newUser);

            return Ok(new { Token = token });
        }
    }
}
