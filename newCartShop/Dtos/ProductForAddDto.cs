using System.ComponentModel.DataAnnotations;

namespace newCartShop.Dtos
{
    public class ProductForAddDto
    {
         [Required]
    public string ProductName { get; set; }
     [Required]
     public double price { get; set; }
    [Required]
    public int CategoryId { get; set; }
    }
}