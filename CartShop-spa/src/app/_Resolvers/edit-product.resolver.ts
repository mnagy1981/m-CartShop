import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Products } from '../_Models/products';
import { ProductService } from '../_Services/product.service';
import { AlertifyService } from '../_Services/alertify.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditProductResolver implements Resolve<Products> {
  constructor(public productService:ProductService,private alertify:AlertifyService
    
    ,private router:Router,private Route:ActivatedRoute) { }
  resolve(route: ActivatedRouteSnapshot): Observable<Products>  {
    debugger;
    return this.productService.GetProduct(this.Route.snapshot.params['id']).pipe(
      catchError(error=>{
          this.alertify.error('prblem retrieving data');
          this.router.navigate(['/shoppingcart']);
          return of(null);
      })
  );
  }
  
}
