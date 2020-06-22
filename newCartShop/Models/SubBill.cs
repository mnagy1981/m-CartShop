namespace newCartShop.Models
{
    public class SubBill
    {
        public int Id { get; set; }
           public int TotlBillId { get; set; }
             public int ProductId { get; set; }
             public double Quantity { get; set; }
             public double price { get; set; }
             public TotalBill TotalBill { get; set; }
    }
}