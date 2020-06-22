using System;

namespace newCartShop.Dtos
{
    public class TotalBillAddDto
    {
          public DateTime dateAdd { get; set; }
        //  public double SumTotal { get; set; }
        
         public int TotlBillId { get; set; }
               public int ProductId { get; set; }
               public double Quantity { get; set; }
               public double price { get; set; }
               public double SumTotal { get; set; }
            //  public int id { get; set; }
            //  public string productName { get; set; }
            //   public double price { get; set; }
            //    public double qantity { get; set; }
            
         public TotalBillAddDto()
               {
                  dateAdd=DateTime.Now;
               }
    }
}