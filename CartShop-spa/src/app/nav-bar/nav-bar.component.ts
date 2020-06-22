import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_Services/auth.service';
import { AlertifyService } from '../_Services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  model:any={};
  photoUrl:string;
  constructor(public authservice:AuthService,private alertify:AlertifyService,private routes:Router) { }

  ngOnInit() {
    this.authservice.currentphotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl)
  }
  Login(){
this.authservice.login(this.model).subscribe(
  x=>{
    this.alertify.success("loggedin successfully");
  },error=>{
    this.alertify.error(error);
  },()=>this.routes.navigate(['/members']));
  }
  LoggedIn(){
  
    return this.authservice.loggedin();
  }
  LogOut(){
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  this.authservice.decodedToken=null;
  this.authservice.currentUser=null;
  this.alertify.messages("Logged Out");
 this.routes.navigate(['/home']);
  }

}
