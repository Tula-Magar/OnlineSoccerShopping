using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using OnlineSoccerShopping.Data;
using OnlineSoccerShopping.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OnlineSoccerShopping.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<ProductsController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> Get()
        {
            return await _context.Products.ToListAsync();
        }

        // GET api/<ProductsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Get(int id)

        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }
        

        // POST api/<ProductsController>
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct( Product product) 
        {
            try
            {
               if (ModelState.IsValid)
                {
                    _context.Products.Add(product);
                    await _context.SaveChangesAsync();
                    
                }
                else
                {
                    return Ok(new { isSuccess = false, data = product});
                }
            }

            catch(Exception ex)
            {
                return Ok(new { isSuccess = false, data = product });
            }

            return RedirectToAction(nameof(Get));
        }

        // PUT api/<ProductsController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> UpdateProduct(int id, [FromBody] Product product)
        {
            if(id != product.ProductId)
            { 
                return NotFound(); 
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

               if(!ProductExist(id))
                {
                    return NotFound();
                }

                else
                {
                    return BadRequest();
                }
            }

            return RedirectToAction(nameof(Get));
        }

        // DELETE api/<ProductsController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> DeleteProduct(int id)
        {
            var FindProduct = await _context.Products.FindAsync(id);

            if(FindProduct != null)
            {
                _context.Products.Remove(FindProduct);
                await _context.SaveChangesAsync();
            }
            else
            {
                return NotFound();
            }

            return RedirectToAction(nameof(Get));
        }

        public bool ProductExist(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
    }
}
