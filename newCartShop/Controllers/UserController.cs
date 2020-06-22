using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CartShop.Data;
using CartShop.Dtos;
using CartShop.Models;
using Microsoft.AspNetCore.Mvc;

namespace  newCartShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAuthRepository<User> _Rep;
        private readonly IMapper _mapper;
        public UserController(IAuthRepository<User> Rep, IMapper mapper)
        {
            _mapper = mapper;
            _Rep = Rep;

        }
         [HttpGet("{id}",Name="GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _Rep.GetUser(id);
             var userToreturn=_mapper.Map<UserForDetailedDto>(user);
            return Ok(userToreturn);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id,UserForUpdateDto userForUpdateDto)
        {
            if(id!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();
            var userFromRepo=await _Rep.GetUser(id);
            _mapper.Map(userForUpdateDto,userFromRepo);
            if(await _Rep.Save())
            return NoContent();
            throw new Exception($"Updating user{id} falid on save");
        }
       
    }
    }
