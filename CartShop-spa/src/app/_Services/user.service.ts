import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }
  GetUser(id):Observable<User>{
    return this.http.get<User>(this.baseUrl+'user/'+id);
  }
  updateuser(id:number,user:User){
return this.http.put(this.baseUrl+'user/'+id,user);
  }
  SetMainPhoto(userId:number,id:number){
    return this.http.post(this.baseUrl+'user/'+userId+'/photouser/'+id+'/setMain',{});

  }
  DeletePhoto(userId:number,id:number){
    return this.http.delete(this.baseUrl+'user/'+userId+'/photouser/'+id);

  }
}
