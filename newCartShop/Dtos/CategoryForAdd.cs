using System.ComponentModel.DataAnnotations;

namespace CartShop.Dtos
{
    public class CategoryForAdd
    {
        [Required]
        public string CategoryName { get; set; }
    }
}