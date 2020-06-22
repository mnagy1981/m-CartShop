using System.Collections.Generic;

namespace CartShop.Dtos
{
    public class UserForDetailedDto
    {
    public int Id { get; set; }
    public string userName { get; set; }
     public string gender { get; set; }
     public string city { get; set; }
    public string Country { get; set; }
    public string photoUrl { get; set; }
    public ICollection<PhotoUserForDetailDto> photosUser { get; set; }
    }
}