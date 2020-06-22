using System.Collections.Generic;
using System.Threading.Tasks;
using CartShop.Models;
using newCartShop.Dtos;
using newCartShop.Helper;
using newCartShop.Models;

namespace CartShop.Data
{
    public interface IAuthRepository<T> where T : class
    {
         Task<User> Register(User user,string password);
        Task<User> LogIn(string userName,string password);
          Task<bool> categoryExists(string categoryName);
          Task<bool> ProductExists(string ProductName);
          Task<bool> UserExists(string userName);
     Task <bool> Save();
      
        Task<User> GetUser(int id);
       Task<Category> AddCategory(Category category);
        Task<Product> AddProduct(Product product);
        Task<IEnumerable<Category>> Getcategory();
      Task<PhotoUser> GetPhotoUser(int id);
      Task<PhotoUser> GetMainPhotoForUser(int userid);
      Task<IEnumerable<Product>> GetProducts();

      
      Task<PagedList<Product>> GetAllProducts(ProductParams productParams);
      Task<Product> GetProduct(int id);
      Task<PhotoProduct> GetPhotoProduct(int id);
      Task<PhotoProduct> GetMainPhotoForProduct(int productid);
      Task Add(T entity);
        Task  Update(T entity);
        Task Remove(T entity);
     Task<TotalBill> AddBill(TotalBill totalBill);
      Task<SubBill> AddSubBill(SubBill subBill);
        
    }
}