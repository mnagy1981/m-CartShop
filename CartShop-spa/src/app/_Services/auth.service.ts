import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_Models/user';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl=environment.apiUrl+"auth/";
jwtHelper=new JwtHelperService();
decodedToken:any;
currentUser:User;
photoUrl=new BehaviorSubject<string>('../../assets/user.png.png');
currentphotoUrl=this.photoUrl.asObservable();
constructor(private http:HttpClient) { }

changeMemberPhoto(photoUrl:string){
this.photoUrl.next(photoUrl);
  }

  login(model:any){
    return this.http.post(this.baseUrl+'login',model).pipe(
      map((response:any)=>{
        const user=response;
        if(user){
          localStorage.setItem('token',user.token);
          localStorage.setItem('user',JSON.stringify(user.user));
         this.decodedToken=this.jwtHelper.decodeToken(user.token);
         this.currentUser=user.user;
         this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }
register(user:User){
  return this.http.post(this.baseUrl+"register",user);
}
loggedin(){
  const token=localStorage.getItem('token');

  return !this.jwtHelper.isTokenExpired(token);
}
}
