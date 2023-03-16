
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineSoccerShopping.Models
{
    public class ShoppingCart
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }
        public UserAccount User { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }

 
    }
}
