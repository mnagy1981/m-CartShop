using System.Linq;
using AutoMapper;
using CartShop.Dtos;
using CartShop.Models;
using newCartShop.Dtos;
using newCartShop.Models;

namespace CartShop.Helper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserForRegisterDto, User>();
             CreateMap<User, UserForListDto>()
           .ForMember(x => x.PhotoUrl, y => y.MapFrom(s => s.PhotosUser.FirstOrDefault(p => p.isMain).url));
             CreateMap<User, UserForDetailedDto>()
            .ForMember(x => x.photoUrl, y => y.MapFrom(s => s.PhotosUser.FirstOrDefault(p => p.isMain).url));
             CreateMap<Product, ProductForDetailedDto>()
                     .ForMember(x => x.photoUrl, y => y.MapFrom(s => s.PhotosProduct.FirstOrDefault(p => p.isMain).url));

             CreateMap<Product, ProductForListDto>()
             .ForMember(x => x.photoUrl, y => y.MapFrom(s => s.PhotosProduct.FirstOrDefault(p => p.isMain).url))
   
                     .ForMember(x => x.CategoryName
                    , y => y.MapFrom(s => s.Category.CategoryName));
          //CreateMap< Product,ProductForListDto>();
           CreateMap<PhotoUserForCreationDto, PhotoUser>();
          CreateMap<AddSaveProduct, PhotoProduct>();
          CreateMap<PhotoProductForCreationDto, PhotoProduct>();
            CreateMap<PhotoUser, PhotoUserForDetailDto>();
             CreateMap<UserForUpdateDto, User>();
             CreateMap<ProductForUpdateDto, Product>();
            CreateMap<CategoryForAdd, Category>();
             CreateMap<AddSaveProduct, Product>();
             CreateMap<TotalBillAddDto, SubBill>();
            //  CreateMap<TotalBillAddDto, TotalBill>();
             CreateMap<PhotoProduct, ProductsPhotosDTO>();

        }
    }
}