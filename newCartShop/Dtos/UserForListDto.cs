using System;

namespace CartShop.Dtos
{
    public class UserForListDto
    {
        
     public int Id { get; set; }
    public string userName { get; set; }

     public string gender { get; set; }

    
    public DateTime created { get; set; }
    
     public string city { get; set; }
    public string country { get; set; }
    public string PhotoUrl { get; set; }
    }
}