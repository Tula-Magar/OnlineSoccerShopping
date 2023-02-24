using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineSoccerShopping.Data;
using OnlineSoccerShopping.Models;
using OnlineSoccerShopping.Models.ViewModels;
using OnlineSoccerShopping.Azure;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OnlineSoccerShopping.Controllers
{
    [Route("api/product")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly IAzureStorage _azureStorage;
        public ProductsController(ApplicationDbContext context, IAzureStorage azureStorage)
        {
            _context = context;
            _azureStorage = azureStorage;
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
            var product = await _context.Products.
                Include(Category => Category.Category).
                FirstOrDefaultAsync(p => p.ProductId == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }
        

        // POST api/<ProductsController>
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<ProductViewModel>> PostProduct([FromForm] ProductViewModel product)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

 
            if (product.Image == null)
            {
                return BadRequest("Product image is null");
            }

            if (product == null)
            {
                return BadRequest("no data");
            }

            Product ob = new Product();

            IFormFile file = product.Image; 
            if (file == null) {
                return BadRequest("BadRequest(\"Product image is null\") is required");
            }
            if (file != null) 
            {
                ob.Name = product.Name;
                ob.Description = product.Description;
                ob.Price = product.Price;
                ob.CategoryId = product.CategoryId;
                ob.ImageUrlName = await _azureStorage.UploadFileAsync(file);
            }

            _context.Products.Add(ob);
            await _context.SaveChangesAsync();

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
