import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PhotoProduct } from 'src/app/_Models/photo-product';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { ProductService } from 'src/app/_Services/product.service';

@Component({
  selector: 'app-edit-photo-product',
  templateUrl: './edit-photo-product.component.html',
  styleUrls: ['./edit-photo-product.component.css']
})
export class EditPhotoProductComponent implements OnInit {
  @Input() photoProduct:PhotoProduct[];
  @Input() ProductID:number;
  @Output()getmemberphotoProductchange=new EventEmitter<string>();
  uploader:FileUploader;
  hasBaseDropZoneOver=false;
  baseUrl=environment.apiUrl;
  currentmain:PhotoProduct;
  constructor(private productService:ProductService,private alertify:AlertifyService) { }

  ngOnInit() {
    
    console.log(this.photoProduct)
    this.ProductID;
    this.InitializeUploder();
  }
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
  InitializeUploder(){
    debugger;
    this.uploader=new FileUploader({
      url:this.baseUrl+'product/'+this.ProductID+'/PhotoProduct/AddPhotoForProduct',
      authToken:'Bearer '+localStorage.getItem('token'),
      isHTML5:true,
      allowedFileType:['image'],
      removeAfterUpload:true,
      maxFileSize:10*1024*1024

    });
    this.uploader.onAfterAddingFile=(File)=>{File.withCredentials=false;};
    this.uploader.onSuccessItem=(item,response)=>{
      if(response){
        const res:PhotoProduct=JSON.parse(response);
        const photo={
          id:res.id,
          url:res.url,
          dateAdd:res.dateAdd,
          isMain:res.isMain
        };
        this.photoProduct.push(photo);
        if(photo.isMain)
        {
       // this.authService.changeMemberPhoto(photo.url);
      // this.authService.currentUser.photoUrl=photo.url;
       //localStorage.setItem('user',JSON.stringify(this.authService.currentUser));
        }
      }

    };
  }
  SetMainPhoto(photo:PhotoProduct){
    debugger;
    this.productService.SetMainPhotoForProduct(this.ProductID,photo.id).subscribe(()=>{
      this.currentmain=this.photoProduct.filter(p=>p.isMain==true)[0];
      this.currentmain.isMain=false;
       photo.isMain=true;
       this.getmemberphotoProductchange.emit(photo.url);
       //this.authService.changeMemberPhoto(photo.url);
       //this.authService.currentUser.photoUrl=photo.url;
       //localStorage.setItem('user',JSON.stringify(this.authService.currentUser));
    },error=>{
      this.alertify.error(error);

    });

  }
  deletePhoto(id:number){
    //this.alertify.confirme('are you sure delete this photo?',()=>{});
this.productService.DeletePhotoForProduct(this.ProductID,id).subscribe(()=>{
  this.photoProduct.splice(this.photoProduct.findIndex(p=>p.id==id),1);
  this.alertify.success('photo has been deleted');
},()=>{
  this.alertify.error('');
});
    
}

}
