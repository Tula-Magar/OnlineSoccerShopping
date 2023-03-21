using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineSoccerShopping.Data;
using OnlineSoccerShopping.Models;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OnlineSoccerShopping.Controllers
{
    [Route("api/shoppingcart")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public ShoppingCartController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<ShoppingCartController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShoppingCart>>> Get()
        {
            return await _context.ShoppingCarts.Include(c => c.Product).ToListAsync();
        }


        // GET api/<ShoppingCartController>/5
        [HttpGet("{id}")]

        public async Task<ActionResult<ShoppingCart>> Get(int id)
        {
            var shoppingCart = await _context.ShoppingCarts.FindAsync(id);

            if (shoppingCart == null)
            {
                return NotFound();
            }

            return shoppingCart;
        }

    
        // POST api/<ShoppingCartController>
        [HttpPost]
        public async Task<ActionResult<ShoppingCart>> Post(ShoppingCart shoppingCart)
        {
            if (shoppingCart == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid) // Change this condition
            {
                return BadRequest(ModelState);
            }

            _context.ShoppingCarts.Add(shoppingCart);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Get", new { id = shoppingCart.Id }, shoppingCart);
        }




        // DELETE api/<ShoppingCartController>/5
        [HttpDelete("{id}")]

        public async Task<ActionResult<ShoppingCart>> Delete(int id)
        {
            var shoppingCart = await _context.ShoppingCarts.FindAsync(id);
            if (shoppingCart == null)
            {
                return NotFound();
            }

            _context.ShoppingCarts.Remove(shoppingCart);
            await _context.SaveChangesAsync();

            return shoppingCart;
        }

    }
}
