import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../_Models/user";

import { Observable, of } from "rxjs";

import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { UserService } from "../_Services/user.service";
import { AlertifyService } from "../_Services/alertify.service";
import { AuthService } from "../_Services/auth.service";




@Injectable()
export class UserEditResolver implements Resolve<User> {
      constructor(public userservice:UserService,private alertify:AlertifyService
        ,private authservice:AuthService
        ,private router:Router) { }
      resolve(route:ActivatedRouteSnapshot):Observable<User>{
          return this.userservice.GetUser(this.authservice.decodedToken.nameid).pipe(
              catchError(error=>{
                  this.alertify.error('prblem retrieving data');
                  this.router.navigate(['/shoppingcart']);
                  return of(null);
              })
          );
      }
}