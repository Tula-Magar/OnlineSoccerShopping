using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using OnlineSoccerShopping.Data;
using OnlineSoccerShopping.Models;
using OnlineSoccerShopping.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OnlineSoccerShopping.Controllers
{
    public class LoginResult
    {
        public string Token { get; set; }
        public UserAccount User { get; set; }
    }

    [Route("api/userAccount")]
    [ApiController]
    public class UserAccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserAccountController(ApplicationDbContext context)
        {
            _context = context;
        }


        // GET: api/<UserAccountController>

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> Login()
        {
            return await _context.Users.ToListAsync();
        }


        

        // POST: api/userAccount/Login

        [HttpPost("Login")]
        public async Task<ActionResult<UserLoginViewModel>> Login(UserLoginViewModel loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == loginDto.Email && u.Password == loginDto.Password);
            if (user == null)
            {
                Console.WriteLine("User not found");
                return NotFound();
            }

            // generate JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new byte[32]; // 256 bits
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(key);
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

          
 

            var result = new LoginResult
            {
                Token = tokenString,
                User = user
            };

            return Ok(result);
        }



        // POST api/<UserAccountController>
 
            [HttpPost]
            public async Task<ActionResult<UserAccount>> AccountRegister(UserAccount user)
            {
                if (user == null)
                {
                    return BadRequest("user must fill all input fields");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(Login), new { id = user.UserId }, user);
            }

            // PUT api/<UserAccountController>/5
            [HttpPut("{id}")]


            public async Task<ActionResult<UserAccount>> UpdateUserAccount(int id, UserAccount user)
            {
                return Ok(user);
            }

            // DELETE api/<UserAccountController>/5
            [HttpDelete("{id}")]
            public async Task<ActionResult<UserAccount>> DeleteUserAccount(int id, UserAccount user)
            {
                return Ok(user);
            }
    }
}
