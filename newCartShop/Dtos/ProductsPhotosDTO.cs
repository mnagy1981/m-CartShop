using System;

namespace newCartShop.Dtos
{
    public class ProductsPhotosDTO
    {
         public int id { get; set; }
        public string url { get; set; }
         public string publicId { get; set; }
          public DateTime dateAdd { get; set; }
           public bool isMain { get; set; }
           public ProductForListDto product { get; set; } 
    }
}