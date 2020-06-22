using CartShop.Models;
using Microsoft.EntityFrameworkCore;
using newCartShop.Models;

namespace newCartShop.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options):base(options){}
          public DbSet<User> Users { get; set; }
          public DbSet<PhotoProduct> PhotosProduct { get; set; }
           public DbSet<PhotoUser> Photosuser { get; set; }
            public DbSet<Product> Products { get; set; }
             public DbSet<Category> Categories { get; set; }
             public DbSet<TotalBill> TotalBills { get; set; }
             public DbSet<SubBill> SubBills { get; set; }
    }
}