using System.Linq;
using System.Security.Claims;
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
    [Route("api/user/{userId}/PhotoUser")]
    [ApiController]
    public class PhotoUserController : ControllerBase
    {
        private readonly IAuthRepository<PhotoUser> _Rep;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _Cloudinaryconfig;
         private Cloudinary _Cloudinary;
        public PhotoUserController(IAuthRepository<PhotoUser> Rep, IMapper mapper, IOptions<CloudinarySettings> Cloudinaryconfig)
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
         [HttpGet("{id}",Name="GetPhoto")]
        public async Task<IActionResult> GetPhoto(int Id)
        {
            var photoFromRepo=await _Rep.GetPhotoUser(Id);
            var photo=_mapper.Map<PhotoUserForReturnDto>(photoFromRepo);
            return Ok(photo);

        }
        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId,[FromForm]PhotoUserForCreationDto photoUserForCreationDto)
        {
              if(userId!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();
            var userFromRepo=await _Rep.GetUser(userId);
            var file=photoUserForCreationDto.file;
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
            photoUserForCreationDto.url=uploadResult.Uri.ToString();
            photoUserForCreationDto.publicId=uploadResult.PublicId;
            var photoUser=_mapper.Map<PhotoUser>(photoUserForCreationDto);
            if(!userFromRepo.PhotosUser.Any(u=>u.isMain))
            photoUser.isMain=true;
            userFromRepo.PhotosUser.Add(photoUser);
            
            if(await _Rep.Save())
            {
               //var PhotoToreturn=_mapper.Map<PhotoUserForReturnDto>(photoUser);
                //return CreatedAtRoute("GetPhoto",new {Id=photoUser.id},PhotoToreturn);
                   return Ok();

            }
            return BadRequest("could not add photo");
        }
        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId,int id)
        {
             if(userId!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();
            var user=await _Rep.GetUser(userId);
            if(!user.PhotosUser.Any(p=>p.id==id))
             return Unauthorized();
             var photoFromRepo=await _Rep.GetPhotoUser(id);
             if(photoFromRepo.isMain)
             return BadRequest("photo already is main");
             var currentMainPhoto=await _Rep.GetMainPhotoForUser(userId);
             currentMainPhoto.isMain=false;
             photoFromRepo.isMain=true;
             if(await _Rep.Save()){
                 return NoContent();
             }
             return BadRequest("couls not set photo to main");

        }

           [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userId,int id)
        {
             if(userId!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            return Unauthorized();
            var user=await _Rep.GetUser(userId);
            if(!user.PhotosUser.Any(p=>p.id==id))
             return Unauthorized();
             var photoFromRepo=await _Rep.GetPhotoUser(id);
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