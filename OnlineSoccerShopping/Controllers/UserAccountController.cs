using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineSoccerShopping.Data;
using OnlineSoccerShopping.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OnlineSoccerShopping.Controllers
{
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

       
        // GET: api/userAccount/Login
        [HttpGet("Login")]
        public async Task<ActionResult<UserAccount>> Login(string email, string password)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email && u.Password == password);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }


        // POST api/<UserAccountController>
        [HttpPost]
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
