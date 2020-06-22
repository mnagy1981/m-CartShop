import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Totalbill } from '../_Models/totalbill';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  dataProducts:Totalbill[]=[];

 baseUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }
  AddBill(totalbill:Totalbill[]){
    debugger;
    console.log(totalbill);
   //var x= JSON.stringify(totalbill)
    return this.http.post(this.baseUrl+"Bill/AddBill",totalbill);
  }
}
