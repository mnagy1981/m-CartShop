using System;
using System.Collections.Generic;

namespace newCartShop.Models
{
    public class TotalBill
    {
         public int Id { get; set; }
         public DateTime dateAdd { get; set; }
        public double SumTotal { get; set; }
         public ICollection<SubBill> SubBill { get; set; }
    }
}