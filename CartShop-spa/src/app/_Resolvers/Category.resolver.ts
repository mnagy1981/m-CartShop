import { Injectable } from "@angular/core";
import { Category } from "../_Models/category";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { AlertifyService } from "../_Services/alertify.service";
import { CagtegoryService } from "../_Services/cagtegory.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class CategoryResolver implements Resolve<Category> {
      constructor(public categoryervice:CagtegoryService,private alertify:AlertifyService
        
        ,private router:Router) { }
      resolve(route:ActivatedRouteSnapshot):Observable<Category>{
          return this.categoryervice.GetCategory().pipe(
              catchError(error=>{
                  this.alertify.error('prblem retrieving data');
                  this.router.navigate(['/shoppingcart']);
                  return of(null);
              })
          );
      }
}