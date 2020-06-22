import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/_Models/user';
import { UserService } from 'src/app/_Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { AuthService } from 'src/app/_Services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @ViewChild('editform')editform:NgForm;
  user:User;
  photoUrl:string;
  @HostListener('window:beforeunload',['$event'])
  unloadNotification($event:any)
  {
    if(this.editform.dirty){
      $event.retunValue=true;
    }
  }
  constructor(private route:ActivatedRoute,private alertify:AlertifyService,private userService:UserService,private authService:AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.user=data['user'];
     console.log(this.user);
    });
    this.authService.currentphotoUrl.subscribe(photoUrl=>this.photoUrl=photoUrl)
    console.log(this.photoUrl);
  }
  updateuser()
  {
    this.userService.updateuser(this.authService.decodedToken.nameid,this.user).subscribe(x=>{
    
      this.alertify.success('profile Update successfuly');
      this.editform.reset(this.user);
    },error=>{
      this.alertify.error(error);
    });
    
   
  }
  updateMainPhoto(PhotoUrl){
    this.user.photoUrl=PhotoUrl;
  }

}
