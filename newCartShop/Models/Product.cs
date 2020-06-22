using System.Collections.Generic;

namespace CartShop.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public double price { get; set; }
        public ICollection<PhotoProduct> PhotosProduct { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }
        


    }
}