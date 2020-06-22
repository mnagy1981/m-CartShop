import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../_Models/category';

@Injectable({
  providedIn: 'root'
})
export class CagtegoryService {

  baseUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }
  GetCategory():Observable<Category>{
    return this.http.get<Category>(this.baseUrl+'Category');
  }
    AddCategory(category:Category){
      return this.http.post(this.baseUrl+"Category/Addcategory",category);
    }
    
  }

