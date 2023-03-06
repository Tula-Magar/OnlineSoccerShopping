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
        public async Task<ActionResult<IEnumerable<UserAccount>>> Get()
        {
            return await _context.Users.ToListAsync();
        }

        // GET api/<UserAccountController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserAccount>> Get(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        // POST api/<UserAccountController>
        [HttpPost]
        public async Task<ActionResult<UserAccount>> AccountRegister([FromBody] UserAccount user)
        {
           if (user == null)
            {
                BadRequest("user must fill the all the input field");
            }

           if (!ModelState.IsValid)
            {
                {
                    return BadRequest(ModelState);
                }
            }
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = user.UserId }, user);
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
