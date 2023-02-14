using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineSoccerShopping.Data;
using OnlineSoccerShopping.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OnlineSoccerShopping.Controllers
{
    [Route("api/productcategory")]
    [ApiController]
    public class ProductCategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductCategoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<ProductsController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductCategory>>> Get()
        {
            return await _context.ProductCategories.ToListAsync();
        }

        // GET api/<ProductsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductCategory>> Get(int id)

        {
            var Category = await _context.ProductCategories.FirstOrDefaultAsync(p => p.CategoryId == id);

            if (Category == null)
            {
                return NotFound();
            }

            return Category;
        }


        // POST api/<ProductsController>
        [HttpPost]
        public async Task<ActionResult<ProductCategory>> PostProduct(ProductCategory productCategory)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _context.ProductCategories.Add(productCategory);
                    await _context.SaveChangesAsync();

                }
                else
                {
                    return Ok(new { isSuccess = false, data = productCategory });
                }
            }

            catch (Exception ex)
            {
                return Ok(new { isSuccess = false, data = productCategory });
            }

            return RedirectToAction(nameof(Get));
        }

        // PUT api/<ProductsController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<ProductCategory>> UpdateProduct(int id, [FromBody] ProductCategory productCategory)
        {
            if (id != productCategory.CategoryId)
            {
                return NotFound();
            }

            _context.Entry(productCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                if (!productCategoryExist(id))
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
        public async Task<ActionResult<ProductCategory>> DeleteProduct(int id)
        {
            var FindProductCategory = await _context.Products.FindAsync(id);

            if (FindProductCategory != null)
            {
                _context.Products.Remove(FindProductCategory);
                await _context.SaveChangesAsync();
            }
            else
            {
                return NotFound();
            }
            return RedirectToAction(nameof(Get));
        }

        public bool productCategoryExist(int id)
        {
            return _context.ProductCategories.Any(e => e.CategoryId == id);
        }
    }
}