using System.ComponentModel.DataAnnotations;

namespace OnlineSoccerShopping.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required(ErrorMessage = "Please enter a name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Please enter an email address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Please enter a password")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Please enter an address")]
        public string Address { get; set; }

        [Required(ErrorMessage = "Please enter a city")]
        public string City { get; set; }

        [Required(ErrorMessage = "Please enter a state")]
        public string State { get; set; }

        [Required(ErrorMessage = "Please enter a zip code")]
        public string ZipCode { get; set; }

        [Required(ErrorMessage = "Please enter a country")]
        public string Country { get; set; }

        [Required(ErrorMessage = "Please enter a phone number")]
        public string Phone { get; set; }

        public virtual ICollection<Order> Orders { get; set; }

        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
