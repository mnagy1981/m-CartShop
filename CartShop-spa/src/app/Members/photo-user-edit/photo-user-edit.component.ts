import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PhotoUser } from 'src/app/_Models/photo-user';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from 'src/app/_Services/user.service';
import { AuthService } from 'src/app/_Services/auth.service';
import { AlertifyService } from 'src/app/_Services/alertify.service';
//import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-photo-user-edit',
  templateUrl: './photo-user-edit.component.html',
  styleUrls: ['./photo-user-edit.component.css']
})
export class PhotoUserEditComponent implements OnInit {
  @Input() photoUser:PhotoUser[];
  @Output()getmemberphotochange=new EventEmitter<string>();
  uploader:FileUploader;
  hasBaseDropZoneOver=false;
  baseUrl=environment.apiUrl;
  currentmain:PhotoUser;
  constructor(private authService:AuthService,private userService:UserService,private alertify:AlertifyService) { }

  ngOnInit() {
    this.InitializeUploder();
  }
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
  InitializeUploder(){
    this.uploader=new FileUploader({
      url:this.baseUrl+'user/'+this.authService.decodedToken.nameid+'/PhotoUser',
      authToken:'Bearer '+localStorage.getItem('token'),
      isHTML5:true,
      allowedFileType:['image'],
      removeAfterUpload:true,
      maxFileSize:10*1024*1024

    });
    this.uploader.onAfterAddingFile=(File)=>{File.withCredentials=false;};
    this.uploader.onSuccessItem=(item,response)=>{
      if(response){
        const res:PhotoUser=JSON.parse(response);
        const photo={
          id:res.id,
          url:res.url,
          dateAdd:res.dateAdd,
          isMain:res.isMain
        };
        this.photoUser.push(photo);
        if(photo.isMain)
        {
        this.authService.changeMemberPhoto(photo.url);
       this.authService.currentUser.photoUrl=photo.url;
       localStorage.setItem('user',JSON.stringify(this.authService.currentUser));
        }
      }

    };
  }
  SetMainPhoto(photo:PhotoUser){
    this.userService.SetMainPhoto(this.authService.decodedToken.nameid,photo.id).subscribe(()=>{
      this.currentmain=this.photoUser.filter(p=>p.isMain==true)[0];
      this.currentmain.isMain=false;
       photo.isMain=true;
       //this.getmemberphotochange.emit(photo.url)
       this.authService.changeMemberPhoto(photo.url);
       this.authService.currentUser.photoUrl=photo.url;
       localStorage.setItem('user',JSON.stringify(this.authService.currentUser));
    },error=>{
      this.alertify.error(error);

    });

  }
  deletePhoto(id:number){
    //this.alertify.confirme('are you sure delete this photo?',()=>{});
this.userService.DeletePhoto(this.authService.decodedToken.nameid,id).subscribe(()=>{
  this.photoUser.splice(this.photoUser.findIndex(p=>p.id==id),1);
  this.alertify.success('photo has been deleted');
},()=>{
  this.alertify.error('');
});
    
}

}
