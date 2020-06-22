using System;
using System.ComponentModel.DataAnnotations;

namespace CartShop.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string UserName { get; set; }
        [StringLength(8,MinimumLength=4,ErrorMessage="كلمة السر لا تقل عن اربع احرف ولا تزيد عن ثمانية")]
        public string Password { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; }
      
        public UserForRegisterDto()
        {
            Created=DateTime.Now;
           
            
        }
    }
}