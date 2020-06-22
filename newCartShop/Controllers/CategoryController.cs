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
    public class CategoryController: ControllerBase
    {
          private readonly IAuthRepository<Category> _Rep;
        private readonly IMapper _mapper;
        public CategoryController(IAuthRepository<Category> Rep, IMapper mapper)
        {
            _mapper = mapper;
            _Rep = Rep;

        }
        [HttpGet()]
        public async Task<IActionResult> getCategory()
        {
            var category = await _Rep.Getcategory();
            return Ok(category);
        }
        [HttpPost("Addcategory")]
        public async Task<IActionResult> Addcategory(CategoryForAdd categoryForAdd)
        {
            categoryForAdd.CategoryName = categoryForAdd.CategoryName.ToLower();
            if (await _Rep.categoryExists(categoryForAdd.CategoryName))
                return BadRequest("هذا الاسم مسجل من قبل");
            var categoryTocreate=_mapper.Map<Category>(categoryForAdd);
           var createUser =await _Rep.AddCategory(categoryTocreate);
            
            return Ok();

        }
    }
}