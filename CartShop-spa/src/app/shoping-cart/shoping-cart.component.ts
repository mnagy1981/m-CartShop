import { Component, OnInit } from '@angular/core';
import { ProductsAddcart } from '../_Models/products-addcart';
import { ShoppingCartService } from '../_Services/shopping-cart.service';
import { Totalbill } from '../_Models/totalbill';
import { AlertifyService } from '../_Services/alertify.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent implements OnInit {
  dataProduct=[];
  totalbill:Array<Totalbill>;
  constructor(private shoppingCartService:ShoppingCartService,private alertify:AlertifyService) { 
    this.dataProduct=this.shoppingCartService.dataProducts;
    
    
  }

  ngOnInit() {
    debugger;
    //this.dataProduct.push({SumTotal:this.totalPrice()});
    //console.log(this.totalbill);
  }
 savedata()
 {
   debugger;
    console.log(this.dataProduct);
//    var json = JSON.stringify(this.dataProduct);
//  console.log(json);
    // const formData = new FormData();
    // for (let i = 0; i < this.dataProduct.length; i++)
    //  {
    //   formData.append('ProductId', this.dataProduct[i].ProductId+"");
    //   formData.append('Quantity', this.dataProduct[i].Quantity+"");
    //  formData.append('price',  this.dataProduct[i].price+"");
    //  }
  //  formData.append('SumTotal', this.totalPrice()+"");
  //
this.dataProduct.push({SumTotal:this.totalPrice()});
// var json = JSON.stringify(formData);
// console.log(json);
    this.shoppingCartService.AddBill(this.dataProduct).subscribe(x =>{

     this.alertify.success('product successfuly');
    //  this.shoppingCartService.dataProducts.length=0
    },error=>{
       this.alertify.error(error); 
     });   
   
 }
 totalPrice() {
  let total = 0;
  for(let data of this.shoppingCartService.dataProducts){
    total += data.price * data.Quantity;
  }
  return total;
 
}
}
