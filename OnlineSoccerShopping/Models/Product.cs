using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace OnlineSoccerShopping.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        [Required(ErrorMessage = "Please enter a product name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Please enter a product description")]
        public string Description { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        [Required(ErrorMessage = "Please enter a product price")]
        public decimal Price { get; set; }
 
        public string ImageUrlName { get; set; }

        [DisplayName("Product Category")]
        public int CategoryId { get; set; }

   
        public ProductCategory Category { get; set; }
    }
}
