using System;

namespace CartShop.Dtos
{
    public class PhotoProductForReturnDto
    {
           public int id { get; set; }
        public string url { get; set; }
         public DateTime dateAdd { get; set; }
        public string publicId { get; set; }
        public bool isMain { get; set; }
    }
}