import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { EditProductComponent } from '../ProductEdit/edit-product/edit-product.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedProductGuard implements CanDeactivate<EditProductComponent> {
  canDeactivate(component: EditProductComponent): boolean | Observable<boolean>  {
    if(component.editform.dirty){
      return confirm('are you sure want continu any un saved changes will be lost')
    }
    return true;
  }
 
}
