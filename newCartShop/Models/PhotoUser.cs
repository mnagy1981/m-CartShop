using System;

namespace CartShop.Models
{
    public class PhotoUser
    {
         public int id { get; set; }
        public string url { get; set; }
         public string publicId { get; set; }
          public DateTime dateAdd { get; set; }
           public bool isMain { get; set; }
           public User user { get; set; }
           public int userId { get; set; }
    }
}