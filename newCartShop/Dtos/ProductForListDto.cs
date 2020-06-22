using System.Collections.Generic;
using System.Collections.ObjectModel;
using CartShop.Models;

namespace newCartShop.Dtos
{
    public class ProductForListDto
    {
         
        public int Id { get; set; }
        public string ProductName { get; set; }
        public double price { get; set; }
        public string  CategoryName { get; set; }
        public string photoUrl { get;set;}
        public Category Category { get; set; }
        public ICollection<PhotoProduct> PhotosProduct { get; set; }


    }
}