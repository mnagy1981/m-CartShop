import { Component, OnInit, Input } from '@angular/core';
import { ProductCard } from '../_Models/product-card';
import { ShoppingCartService } from '../_Services/shopping-cart.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {

  constructor(private shoppingCartService:ShoppingCartService) { }
  @Input('Product') Product;
  dataProduct=[];
  ngOnInit(): void {
  //debugger;
  console.log(this.Product);
  
  
  }
  Addtable(Product)
  {
    this.shoppingCartService.dataProducts
    debugger;
    var index=this.shoppingCartService.dataProducts.findIndex(item =>item.ProductId==Product.id);
    if (index != -1) {
      this.shoppingCartService.dataProducts[index].Quantity=(this.shoppingCartService.dataProducts[index].Quantity)+1;
    }
    else
    {
      
      this.shoppingCartService.dataProducts.push({ProductId:Product.id,
        productName:Product.productName,
        price:Product.price,
       Quantity:1});
    }
    
    console.log(Product);

  }
  getQunatity()
  {
    var index=this.shoppingCartService.dataProducts.findIndex(item =>item.ProductId==this.Product.id);
    if (index == -1) {
      return 0;
    }
    else
    {
      return this.shoppingCartService.dataProducts[index].Quantity;
    }
  }
  RemoveFromCart(Product)
  {
    var index=this.shoppingCartService.dataProducts.findIndex(item =>item.ProductId==Product.id);
    if (index != -1) {
      this.shoppingCartService.dataProducts[index].Quantity=(this.shoppingCartService.dataProducts[index].Quantity)-1;
    }
  }
  
}
