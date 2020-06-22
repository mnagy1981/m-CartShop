using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CartShop.Models;
using Microsoft.EntityFrameworkCore;
using newCartShop.Data;
using newCartShop.Dtos;
using newCartShop.Helper;
using newCartShop.Models;

namespace CartShop.Data
{
    public class AuthRepository<T> : IAuthRepository<T> where T : class
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;
        }
        public async Task Add(T entity)
        {
             await _context.Set<T>().AddAsync(entity);
             await Save();
        }

        public async Task<PhotoProduct> GetMainPhotoForProduct(int productid)
        {
             return await _context.PhotosProduct.Where(u=>u.ProductId==productid)
            .FirstOrDefaultAsync(p=>p.isMain);
        }

        public async Task<PhotoUser> GetMainPhotoForUser(int userid)
        {
            return await _context.Photosuser.Where(u=>u.userId==userid)
            .FirstOrDefaultAsync(p=>p.isMain);
        }

        public async Task<PhotoProduct> GetPhotoProduct(int id)
        {
             var photoProduct=await _context.PhotosProduct.FirstOrDefaultAsync(u=>u.id==id);
           return photoProduct;
        }

        public async Task<PhotoUser> GetPhotoUser(int id)
        {
             var photo=await _context.Photosuser.FirstOrDefaultAsync(u=>u.id==id);
           return photo;
        }
         public async Task<IEnumerable<Product>> GetProducts()
        {
            var product=await _context.Products.Include(p=>p.PhotosProduct).ToListAsync();
           return product;
        }
        public async Task<Product> GetProduct(int id)
        {
            var product=await _context.Products.Include(p=>p.PhotosProduct).FirstOrDefaultAsync(u=>u.Id==id);
           return product;
        }
      
        public async Task<User> GetUser(int id)
        {
            var user=await _context.Users.Include(p=>p.PhotosUser).FirstOrDefaultAsync(u=>u.Id==id);
           return user;
        }

        public async Task<User> LogIn(string userName, string password)
        {
           var user=await _context.Users.Include(p=>p.PhotosUser).FirstOrDefaultAsync(x=>x.UserName==userName);
            if(user==null)return null;
            if(!VerifypaswordHash(password,user.PasswordHash,user.PasswordSalt)) return null;
            return user;
        }

        private bool VerifypaswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac=new System.Security.Cryptography.HMACSHA512(passwordSalt))
         {
           
            var  computHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        for (int i = 0; i < computHash.Length; i++)
        {
            if(computHash[i]!=passwordHash[i])
            {
                return false;
            }
           
        }
         return true;
         };
        }

        public async Task<User> Register(User user, string password)
        {
             byte[]PaswordHash,PaswordSalt;
           createPasswordHash(password,out PaswordHash,out PaswordSalt);
            user.PasswordHash=PaswordHash;
           user.PasswordSalt=PaswordSalt;
           await _context.Users.AddAsync(user);
           await Save();
           return user;
        }

        private void createPasswordHash(string password, out byte[] paswordHash, out byte[] paswordSalt)
        {
            using (var hmac=new System.Security.Cryptography.HMACSHA512())
         {
             paswordSalt=hmac.Key;
             paswordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
         }
        }

        public async Task Remove(T entity)
        {
              _context.Set<T>().Remove(entity);
           await Save();
        }

       public async Task<bool> Save()
        {
        return await _context.SaveChangesAsync()>0;
        }


       public async Task Update(T entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await Save();
        }

        public async Task<bool> UserExists(string userName)
        {
           if(await _context.Users.AnyAsync(x=>x.UserName==userName))return true;
           return false;
           
           
        }

        public async Task<IEnumerable<Models.Category>> Getcategory()
        {
            var category=await _context.Categories.ToListAsync();
           return category;
        }

        public async Task<Category> AddCategory(Category category)
        {
            await _context.Categories.AddAsync(category);
           await Save();
           return category;
        }

        public async Task<bool> categoryExists(string categoryName)
        {
            if(await _context.Categories.AnyAsync(x=>x.CategoryName==categoryName))return true;
           return false;
        }

        public async Task<bool> ProductExists(string ProductName)
        {
            if(await _context.Products.AnyAsync(x=>x.ProductName==ProductName))return true;
           return false;
        }

        public async Task<Product> AddProduct(Product product)
        {
            await _context.Products.AddAsync(product);
           await Save();
           return product;
        }

        public async Task<PagedList<Product>> GetAllProducts(ProductParams productParams)
        {
           
            //   var products=await _context.Product.Include(h=>h.ca).ThenInclude(x=>x.PhotosProduct)
            //   .Where(s=>s.Id==s.Product.FirstOrDefault().CategoryId).ToListAsync();
            //   return products;


            var getAllItems =  _context.Products.Include(ax=> ax.PhotosProduct).Include(x=> x.Category);
           return await PagedList<Product>.createAsync(getAllItems,productParams.PageNumber,productParams.PageSize);

           
        }

        public async  Task<TotalBill> AddBill(TotalBill totalBill)
        {
           await _context.TotalBills.AddAsync(totalBill);
           await Save();
           return totalBill;
        }

        public async Task<SubBill> AddSubBill(SubBill subBill)
        {
            await _context.SubBills.AddAsync(subBill);
           await Save();
           return subBill;
        }
    }
}