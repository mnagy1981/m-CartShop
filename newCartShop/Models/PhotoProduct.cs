using System;


namespace CartShop.Models
{
    public class PhotoProduct
    {
         public int id { get; set; }
        public string url { get; set; }
         public string publicId { get; set; }
          public DateTime dateAdd { get; set; }
           public bool isMain { get; set; }
           public Product product { get; set; }
           public int ProductId { get; set; }
           
    }
    
}