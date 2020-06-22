import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate } from '@angular/router';
import { EditUserComponent } from '../Members/Edit-user/edit-user/edit-user.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedGuard implements CanDeactivate <EditUserComponent> {
  canDeactivate(component: EditUserComponent):  boolean {
    if(component.editform.dirty){
      return confirm('are you sure want continu any un saved changes will be lost')
    }
    return true;
  }
}

