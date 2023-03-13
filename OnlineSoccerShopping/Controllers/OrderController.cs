using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineSoccerShopping.Data;
using OnlineSoccerShopping.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineSoccerShopping.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Associate the order with the user
            order.User = await _context.Users.FindAsync(order.UserId);

            // Calculate the order total by summing the prices of all order items
            order.OrderTotal = order.OrderItems.Sum(item => item.Price * item.Quantity);


            // Associate each order items with the orderItem

            foreach(var item in order.OrderItems)
{
                var product = await _context.Products.FindAsync(item.ProductId);

                if (product == null)
                {
                    return BadRequest($"Product {item.ProductId} not found.");
                }

                var orderItem = new OrderItem
                {
                    UserId = order.UserId,
                    OrderId = order.OrderId,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Price = product.Price
                };

                // Set the OrderId property of the order item to the new order's OrderId
                item.OrderId = order.OrderId;

                order.OrderItems.Add(orderItem);
            }


            // Add the order and its associated order items to the database
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrder), new { id = order.OrderId }, order);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            // Load the order items associated with the order
            await _context.Entry(order)
                .Collection(o => o.OrderItems)
                .LoadAsync();

            return order;
        }
    }
}
