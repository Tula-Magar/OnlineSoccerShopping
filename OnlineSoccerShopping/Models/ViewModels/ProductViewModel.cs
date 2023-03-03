using Duende.IdentityServer.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace OnlineSoccerShopping.Models.ViewModels
{
    public class ProductViewModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [Range(0, 100000)]
        public decimal Price { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int CategoryId { get; set; }


        public IFormFile Image { get; set; }
    }

}
