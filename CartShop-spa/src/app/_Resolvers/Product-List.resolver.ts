import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../_Models/user";
//import { AlertifyService } from "../_Service/alertify.service";
import { AlertifyService } from "../_Services/alertify.service";
import { Observable, of } from "rxjs";

import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { ProductService } from "../_Services/product.service";
import { Products } from "../_Models/products";


@Injectable()

export class ProductListResolver implements Resolve<Products[]> {
    pageNumber=1;
    pageSize=5;

      constructor(private productService:ProductService,private alertify:AlertifyService,private router:Router) { }
      resolve(route:ActivatedRouteSnapshot):Observable<Products[]>{
          return this.productService.GetAllProducts(this.pageNumber,this.pageSize).pipe(
              catchError(error=>{
                  this.alertify.error('prblem retrieving data');
                  this.router.navigate(['/home']);
                  return of(null);
              })
          );
      }
}