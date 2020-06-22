import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs'
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  confirme(message:string,okcallback:()=> any){
    alertify.confirme(message,(e:any)=>{
      if(e){
        okcallback();
      }
      else{}
    });
      }
      success(message:string)
      {
        alertify.success(message);
      }
      error(message:string)
      {
        alertify.error(message);
      }
      warning(message:string)
      {
        alertify.warning(message);
      }
      messages(message:string)
      {
        alertify.message(message);
      }
}
