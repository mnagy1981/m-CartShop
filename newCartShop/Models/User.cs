using System;
using System.Collections.Generic;

namespace CartShop.Models
{
    public class User
    {
     public int Id { get; set; }
    public string UserName { get; set; }
    public byte[] PasswordHash { get; set; }
     public byte[] PasswordSalt { get; set; }
     public string Gender { get; set; }
    public DateTime DatOfBirth { get; set; }
    public DateTime Created { get; set; }
     public string City { get; set; }
    public string Country { get; set; }
    public ICollection<PhotoUser> PhotosUser { get; set; }

    }
}