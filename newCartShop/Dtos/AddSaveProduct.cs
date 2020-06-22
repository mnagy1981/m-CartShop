using System;
using Microsoft.AspNetCore.Http;

namespace newCartShop.Dtos
{
    public class AddSaveProduct
    {
        
     public int id { get; set; }
     public string url { get; set; }
    public DateTime dateAdd { get; set; }
    public string publicId { get; set; }
    public IFormFile Profile { get; set; }
     public string ProductName { get; set; }
     public double price { get; set; }
  
    public int CategoryId { get; set; }
              public AddSaveProduct()
              {
                dateAdd=DateTime.Now;
              }
    }
}