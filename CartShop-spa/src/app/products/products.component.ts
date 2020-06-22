import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_Services/product.service';
import { AlertifyService } from '../_Services/alertify.service';
import { Subscription } from 'rxjs';
import { PaginatedResult, Pagination } from '../_Models/pagination';
import { Products } from '../_Models/products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
ProductsItem:any[]=[];;
filterProducts:any[]=[];
pagination:Pagination;
category='';
subscribtion:Subscription;
  constructor(private Route:ActivatedRoute,private productService:ProductService
    ,private alertify:AlertifyService,private router:Router, private route:ActivatedRoute) {
      //this.getAllProducts();
      
     }
  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.ProductsItem=data['products'].result;
      this.pagination=data['products'].pagination;
    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    //console.log(this.pagination.currentPage);
   this.getAllProducts();
  }
  getAllProducts()
  {
    this.subscribtion=this.productService.GetAllProducts(this.pagination.currentPage,this.pagination.itemsPerPage).subscribe(
      (res: PaginatedResult<Products[]>) => {
      this.ProductsItem = res.result;
      this.pagination=res.pagination;
      return this.Route.queryParamMap
    .subscribe(params=>{
          
       this.category=params.get('category');
        
          this.filterProducts=this.category?
            this.ProductsItem.filter(p=>p.category.id==this.category):this.ProductsItem;
        })
      })
  }
 
 
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
