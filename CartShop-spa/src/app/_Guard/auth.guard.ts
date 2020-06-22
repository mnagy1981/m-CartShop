import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_Services/auth.service';
import { AlertifyService } from '../_Services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authservice:AuthService,private alertify:AlertifyService,private routes:Router) { }
  canActivate():boolean {
    if(this.authservice.loggedin())
  {
    return true;
  }
  this.alertify.error('you will shall not pass !!!!!!!!');
  this.routes.navigate(['/home']);
  return false;

  }
  }

