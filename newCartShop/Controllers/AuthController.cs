using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using CartShop.Data;
using CartShop.Dtos;
using CartShop.Models;
using Microsoft.Extensions.Configuration;

namespace newCartShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository<User> _rep;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository<User> Rep, IConfiguration config, IMapper mapper)
        {
            _mapper = mapper;
            _config = config;
            _rep = Rep;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.UserName = userForRegisterDto.UserName.ToLower();
            if (await _rep.UserExists(userForRegisterDto.UserName))
                return BadRequest("هذا المستخدم مسجل من قبل");
            var userTocreate = _mapper.Map<User>(userForRegisterDto);
            var createUser = await _rep.Register(userTocreate, userForRegisterDto.Password);
            var userToreturn = _mapper.Map<UserForDetailedDto>(createUser);
            return CreatedAtRoute("GetUser", new { Controller = "Users", id = createUser.Id }, userToreturn);

        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromrepo = await _rep.LogIn(userForLoginDto.userName.ToLower(), userForLoginDto.password);
            if (userFromrepo == null) return Unauthorized();
            var claims = new[]{
                 new Claim(ClaimTypes.NameIdentifier,userFromrepo.Id.ToString()),
                 new Claim(ClaimTypes.Name,userFromrepo.UserName)

             };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var user = _mapper.Map<UserForListDto>(userFromrepo);
            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });


        }
    }
}