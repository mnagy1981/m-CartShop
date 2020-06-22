using System.Collections.Generic;
using CartShop.Models;

namespace CartShop.Dtos
{
    public class ProductForDetailedDto
    {
            public int Id { get; set; }
    public string ProductName { get; set; }
     public double price { get; set; }
    public string photoUrl { get; set; }
    

     public ICollection<PhotoProduct> PhotosProduct { get; set; }
    }
}