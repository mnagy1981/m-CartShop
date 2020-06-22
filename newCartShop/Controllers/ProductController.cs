using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CartShop.Data;
using CartShop.Dtos;
using CartShop.Helper;
// using CartShop.Dtos;
using CartShop.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using newCartShop.Dtos;
using Newtonsoft.Json;
using  Microsoft.AspNetCore.Http;
using newCartShop.Helper;
// using newCartShop.Dtos;

namespace newCartShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IAuthRepository<Product> _Rep;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _Cloudinaryconfig;
        private Cloudinary _Cloudinary;
        public ProductController(IAuthRepository<Product> Rep, IMapper mapper, IOptions<CloudinarySettings> Cloudinaryconfig)
        {
            _mapper = mapper;
            _Rep = Rep;
             _Cloudinaryconfig = Cloudinaryconfig;
              Account acc=new Account(
 _Cloudinaryconfig.Value.CloudName,
  _Cloudinaryconfig.Value.APIKey,
   _Cloudinaryconfig.Value.APISecret

        );
        _Cloudinary=new Cloudinary(acc);

        }
        [HttpGet("{id}", Name = "GetProduct")]
         public async Task<IActionResult> GetProduct(int id)
        {
             var product = await _Rep.GetProduct(id);
            var productToreturn = _mapper.Map<ProductForDetailedDto>(product);
             return Ok(productToreturn);
         }
        [HttpGet("getProdcuts")]
        public async Task<IActionResult> GetAllProduct([FromQuery]ProductParams productParams)
        {
         
            var Allproduct = await _Rep.GetAllProducts(productParams);
            var productToList = _mapper.Map<IEnumerable<ProductForListDto>>(Allproduct);
                Response.AddPagination(Allproduct.CurrentyPage,Allproduct.PageSize
            ,Allproduct.TotalCount,Allproduct.TotalPages);
            
            return Ok(productToList);
        }
         [HttpPost("AddProduct")]
         public async Task<IActionResult> AddProduct([FromForm]AddSaveProduct  objString)
         {
            objString.ProductName = objString.ProductName.ToLower();
             if (await _Rep.ProductExists(objString.ProductName))
                 return BadRequest("هذا الاسم مسجل من قبل");
             var ProductTocreate = _mapper.Map<Product>(objString);
             var createProduct = await _Rep.AddProduct(ProductTocreate);
             var id = createProduct.Id;
             var ProductToreturn = _mapper.Map<ProductForDetailedDto>(createProduct);
              var productFromRepo=await _Rep.GetProduct(id);
            var file=objString.Profile;
            var uploadResult=new ImageUploadResult();
            if(file.Length>0)
            {
                using(var stream=file.OpenReadStream()){
                    var uploadParams=new ImageUploadParams(){
                        File=new FileDescription(file.Name,stream),
                        Transformation=new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    uploadResult=_Cloudinary.Upload(uploadParams);
                }

            }
            objString.url=uploadResult.Uri.ToString();
            objString.publicId=uploadResult.PublicId;
            var photoProduct=_mapper.Map<PhotoProduct>(objString);
            if(!productFromRepo.PhotosProduct.Any(u=>u.isMain))
            photoProduct.isMain=true;
           productFromRepo.PhotosProduct.Add(photoProduct);
            
            if(await _Rep.Save())
            {
               
                    return CreatedAtRoute("GetProduct", new { Controller = "Product", id = createProduct.Id }, ProductToreturn);

            }
                      return   BadRequest("could not add photo");
          



        }
         [HttpPut("{id}")]
         public async Task<IActionResult> UpdateProduct(int id, ProductForUpdateDto productForUpdateDto)
         {
        //      if(id!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        //  return Unauthorized();
            var productFromRepo = await _Rep.GetProduct(id);
            _mapper.Map(productForUpdateDto, productFromRepo);
            if (await _Rep.Save())
                return NoContent();
            throw new Exception($"Updating product{id} falid on save");
        }
    }
}