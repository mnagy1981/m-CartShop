using System;
using Microsoft.AspNetCore.Http;

namespace CartShop.Dtos
{
    public class PhotoUserForCreationDto
    {
         public int id { get; set; }
        public string url { get; set; }
        
          public DateTime dateAdd { get; set; }
            public string publicId { get; set; }
              public IFormFile file { get; set; }
              public PhotoUserForCreationDto()
              {
                dateAdd=DateTime.Now;
              }
    }
}