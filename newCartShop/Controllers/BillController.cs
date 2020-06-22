using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using CartShop.Data;
using Microsoft.AspNetCore.Mvc;
using newCartShop.Dtos;
using newCartShop.Models;

namespace newCartShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillController: ControllerBase
    {
        private readonly IAuthRepository<TotalBill> _repTotalBill;
        private readonly IAuthRepository<SubBill> _repSubBill;
        private readonly IMapper _mapper;

        public BillController(IAuthRepository<TotalBill> RepTotalBill,IAuthRepository<SubBill> RepSubBill, IMapper mapper)
        {
            _mapper = mapper;
           
           
            _repTotalBill = RepTotalBill;
            _repSubBill = RepSubBill;
           
        }
              [HttpPost("AddBill")]
        public async Task<IActionResult> AddBill([FromBody]TotalBillAddDto[]  totalBillAddDto)
          
         {
           TotalBill totalBill=new TotalBill();
            double total = 0;
           //foreach (var bill in totalBillAddDto)
  //{
      //total += bill.price * bill.Quantity;
  //}
  //totalBill.SumTotal=total;

    List<SubBill> SubBillist = new List<SubBill>();
                    SubBill subBill;
                    foreach (var subBillItem in totalBillAddDto)
                    {
                        subBill = new SubBill();
                         total += subBillItem.price * subBillItem.Quantity;
                        subBill.ProductId = subBillItem.ProductId;
                        subBill.Quantity = subBillItem.Quantity;
                        subBill.price = subBillItem.price;
                        SubBillist.Add(subBill);
                    }
                    totalBill.SubBill=SubBillist;
                totalBill.SumTotal=total;
              // var createSubBill = await _repTotalBill.AddSubBill(SubBillTocreate);
               await _repTotalBill.AddBill(totalBill);
              return Ok();
  // for(let data of this.shoppingCartService.dataProducts){
  //   total += data.price * data.Quantity;
  // }
  
              //  var TotalBillTocreate = _mapper.Map<sub>(totalBillAddDto);
                // var createTotalBill = await _repTotalBill.AddBill(TotalBillTocreate);
                // totalBillAddDto.TotlBillId= createTotalBill.Id;
              //  var SubBillTocreate = _mapper.Map<IEnumerable<TotalBillAddDto>, IEnumerable<SubBill>>(totalBillAddDto);
                // totalBill.SubBill=SubBillTocreate;
                
                // var SubBillTocreate = _mapper.Map<SubBill>(totalBillAddDto);
               
                  

         }
        
    }
}