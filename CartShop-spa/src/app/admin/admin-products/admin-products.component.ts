import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_Services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
 Products$;

  constructor(private productService:ProductService) { }

  ngOnInit() 
  {
    

    this.Products$=this.productService.GetAllProducts();
    
  }

}
