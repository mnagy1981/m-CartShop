import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Products } from '../_Models/products';
import { Observable } from 'rxjs';
import { PhotoProductforcreation } from '../_Models/photo-productforcreation';
import { PaginatedResult } from '../_Models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }
  GetAllProducts(page?,itemsPerPage?):Observable<PaginatedResult<Products[]>>{
    const paginatedResult:PaginatedResult<Products[]>=new PaginatedResult<Products[]>();
    let params=new HttpParams();
    if(page!=null && itemsPerPage!=null)
    {
      params=params.append('pageNumber',page);
      params=params.append('pagesize',itemsPerPage);
    }
    console.log(this.http.get<Products[]>(this.baseUrl+'product/getProdcuts',{observe:'response',params}).pipe(
      map(response=>{
        paginatedResult.result=response.body;
        if(response.headers.get('Pagination')!=null)
        {
          paginatedResult.pagination=JSON.parse(response.headers.get('Pagination'))
          console.log(paginatedResult)
        }
        return paginatedResult;
        

      })
    ))
    return this.http.get<Products[]>(this.baseUrl+'product/getProdcuts',{observe:'response',params}).pipe(
      map(response=>{
        paginatedResult.result=response.body;
        if(response.headers.get('Pagination')!=null)
        {
          paginatedResult.pagination=JSON.parse(response.headers.get('Pagination'))
          console.log(paginatedResult)
        }
        return paginatedResult;
        

      })
    );
    //return this.http.get<Products[]>(this.baseUrl+'Product/getProdcuts/');
  }
  GetProduct(id):Observable<Products>{
    return this.http.get<Products>(this.baseUrl+'Product/'+id);
  }
  AddProduct(Image:FormData){
    
    return this.http.post(this.baseUrl+"Product/AddProduct",Image);
  }
  updateProduct(id:number,products:Products){
return this.http.put(this.baseUrl+'product/'+id,products);
  }
  SetMainPhotoForProduct(productId:number,id:number){
    return this.http.post(this.baseUrl+'product/'+productId+'/photoproduct/'+id+'/setMain',{});

  }
  DeletePhotoForProduct(userId:number,id:number){
    return this.http.delete(this.baseUrl+'product/'+userId+'/photoproduct/'+id);

  }
}
