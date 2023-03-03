using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineSoccerShopping.Data;
using OnlineSoccerShopping.Models;
using OnlineSoccerShopping.Models.ViewModels;
using OnlineSoccerShopping.Azure;
using System.Text.Json.Serialization;
using System.Text.Json;

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
        public async Task<ActionResult<IEnumerable<object>>> Get()
        {
            var products = await _context.Products.Include(c => c.Category).ToListAsync();

            var result = products.Select(async p => new {
                p.ProductId,
                p.Name,
                p.Description,
                p.Price,
                ImageUrl = string.IsNullOrEmpty(p.ImageUrlName) ? null : await _azureStorage.GetImageAsync(p.ImageUrlName),
                Category = new
                {
                    p.Category.CategoryId,
                    p.Category.Name
                }
            });

            var productsWithImages = await Task.WhenAll(result);

            return Ok(productsWithImages);
        }


        // GET api/<ProductsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Get(int id)
        {
            var product = await _context.Products
                .Include(c => c.Category)
                .FirstOrDefaultAsync(p => p.ProductId == id);

            if (product == null)
            {
                return NotFound();
            }

            product.ImageUrlName = string.IsNullOrEmpty(product.ImageUrlName) ? null : await _azureStorage.GetImageAsync(product.ImageUrlName);
  

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

            return CreatedAtAction(nameof(Get), new { id = ob.ProductId }, ob);
        }
         
        // PUT api/<ProductsController>/5
    
        [HttpPut("{id}")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<ProductViewModel>> UpdateProduct(int id, [FromForm] ProductViewModel productViewModel)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingProduct = await _context.Products.FindAsync(id);

            if (existingProduct == null)
            {
                return NotFound();
            }

            IFormFile file = productViewModel.Image;
            if (file != null)
            {
                existingProduct.Name = productViewModel.Name;
                existingProduct.Description = productViewModel.Description;
                existingProduct.Price = productViewModel.Price;
                existingProduct.CategoryId = productViewModel.CategoryId;
 

                if (!string.IsNullOrEmpty(existingProduct.ImageUrlName))
                {
                    await _azureStorage.DeleteFileAsync(existingProduct.ImageUrlName);
                }
                existingProduct.ImageUrlName = await _azureStorage.UploadFileAsync(file);
            }
            else
            {
                existingProduct.Name = productViewModel.Name;
                existingProduct.Description = productViewModel.Description;
                existingProduct.Price = productViewModel.Price;
                existingProduct.CategoryId = productViewModel.CategoryId;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExist(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(Get), new { id = existingProduct.ProductId }, existingProduct);
        }


        // DELETE api/<ProductsController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> DeleteProduct(int id)
        {
            var FindProduct = await _context.Products.FindAsync(id);

            if(FindProduct != null)
            {
                await _azureStorage.DeleteFileAsync(FindProduct.ImageUrlName);
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
