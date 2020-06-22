import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Products } from 'src/app/_Models/products';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/_Services/product.service';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
//import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @ViewChild('editform')editform:NgForm;
  products:Products;
  photoUrl:string;
  productID:number;
 
  constructor(private Route:ActivatedRoute,private productService:ProductService
    ,private alertify:AlertifyService,private router:Router) {
      
     }

  ngOnInit(): void {
    this.productID=this.Route.snapshot.params['id'];
    this.getProduct().subscribe(data=>{
      this.products=data;
      this.photoUrl=this.products.photoUrl;
     console.log(this.photoUrl);
    });

  }
  getProduct()
  {
    return this.productService.GetProduct(this.Route.snapshot.params['id']).pipe(
      catchError(error=>{
          this.alertify.error('prblem retrieving data');
          this.router.navigate(['/shoppingcart']);
          return of(null);
      }));
  }
  updateProduct()
  {
    this.productService.updateProduct(this.productID,this.products).subscribe(x=>{
    
      this.alertify.success('product Update successfuly');
      this.editform.reset(this.products);
    },error=>{
      this.alertify.error(error);
    });
  }
  updateMainPhotoProduct(PhotoUrl){
    debugger;
    this.products.photoUrl=PhotoUrl;
    this.photoUrl=PhotoUrl;

  }
}
