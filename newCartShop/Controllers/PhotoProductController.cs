using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CartShop.Data;
using CartShop.Dtos;
using CartShop.Helper;
using CartShop.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace  newCartShop.Controllers
{
    [Route("api/product/{ProductId}/PhotoProduct")]
    [ApiController]
    public class PhotoProductController : ControllerBase
    {
        private readonly IAuthRepository<PhotoProduct> _Rep;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _Cloudinaryconfig;
        private Cloudinary _Cloudinary;
        public PhotoProductController(IAuthRepository<PhotoProduct> Rep, IMapper mapper, IOptions<CloudinarySettings> Cloudinaryconfig)
        {
            _Cloudinaryconfig = Cloudinaryconfig;
           _mapper = mapper;
           _Rep = Rep;

            Account acc=new Account(
 _Cloudinaryconfig.Value.CloudName,
  _Cloudinaryconfig.Value.APIKey,
   _Cloudinaryconfig.Value.APISecret

        );
        _Cloudinary=new Cloudinary(acc);

        }
        [HttpGet("{id}",Name="GetPhotoProduct")]
        public async Task<IActionResult> GetPhotoProduct(int Id)
        {
            var photoFromRepo=await _Rep.GetPhotoProduct(Id);
            var photo=_mapper.Map<PhotoProductForReturnDto>(photoFromRepo);
            return Ok(photo);

        }
        [HttpPost("AddPhotoForProduct")]
        public async Task<IActionResult> AddPhotoForProduct(int ProductId,[FromForm]PhotoProductForCreationDto photoProductForCreationDto)
        {
            
            var productFromRepo=await _Rep.GetProduct(ProductId);
            var file=photoProductForCreationDto.file;
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
            photoProductForCreationDto.url=uploadResult.Uri.ToString();
            photoProductForCreationDto.publicId=uploadResult.PublicId;
            var photoProduct=_mapper.Map<PhotoProduct>(photoProductForCreationDto);
            if(!productFromRepo.PhotosProduct.Any(u=>u.isMain))
            photoProduct.isMain=true;
           productFromRepo.PhotosProduct.Add(photoProduct);
            
            if(await _Rep.Save())
            {
               //var PhotoToreturn=_mapper.Map<PhotoUserForReturnDto>(photoUser);
                //return CreatedAtRoute("GetPhoto",new {Id=photoUser.id},PhotoToreturn);
                   return Ok();

            }
            return BadRequest("could not add photo");
        }
        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int ProductId,int id)
        {
             //if(userId!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //return Unauthorized();
            var product=await _Rep.GetProduct(ProductId);
            if(!product.PhotosProduct.Any(p=>p.id==id))
             return Unauthorized();
             var photoFromRepo=await _Rep.GetPhotoProduct(id);
             if(photoFromRepo.isMain)
             return BadRequest("photo already is main");
             var currentMainPhoto=await _Rep.GetMainPhotoForProduct(ProductId);
             currentMainPhoto.isMain=false;
             photoFromRepo.isMain=true;
             if(await _Rep.Save()){
                 return NoContent();
             }
             return BadRequest("couls not set photo to main");

        }

           [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int ProductId,int id)
        {
             //if(userId!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //return Unauthorized();
             var product=await _Rep.GetProduct(ProductId);
            if(!product.PhotosProduct.Any(p=>p.id==id))
             return Unauthorized();
             var photoFromRepo=await _Rep.GetPhotoProduct(id);
             if(photoFromRepo.isMain)
             return BadRequest("you can't delete  main photo");
             if(photoFromRepo.publicId!=null)
             {
            var DeleteParams=new DeletionParams(photoFromRepo.publicId);
             var ruslt=_Cloudinary.Destroy(DeleteParams);
             if(ruslt.Result=="ok")
             {
                 await _Rep.Remove(photoFromRepo);
                 await _Rep.Save();
                   return Ok();
             }

             }
             if(photoFromRepo.publicId==null)
             {
            
                 await _Rep.Remove(photoFromRepo);
                 await _Rep.Save();
                   return Ok();
             }
             //if(await _Rep.Save())
                // return Ok();
            
             return BadRequest("Falied to Delete the photo");

        }

    }
}