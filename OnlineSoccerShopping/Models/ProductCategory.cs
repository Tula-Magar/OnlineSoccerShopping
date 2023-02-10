using System.ComponentModel.DataAnnotations;

namespace OnlineSoccerShopping.Models
{
    public class ProductCategory
    {
        [Key]
        public int CategoryId { get; set; }

        [Required(ErrorMessage = "Please enter a category name")]
        public string Name { get; set; }

        public ICollection<Product> Products { get; set; }

    }
}
