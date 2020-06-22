import { Component, OnInit } from '@angular/core';
import { CagtegoryService } from 'src/app/_Services/cagtegory.service';
import { Products } from 'src/app/_Models/products';
import { ProductService } from 'src/app/_Services/product.service';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhotoProductforcreation } from 'src/app/_Models/photo-productforcreation';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
Category$;
Addform:FormGroup;
product:Products;
///photoProductforcreation:PhotoProductforcreation;
selectedFile:File=null;

imageSrc:string = '';
  constructor(private categoryService:CagtegoryService,private productService:ProductService
    ,private alertify:AlertifyService,private fb:FormBuilder ) { 
this.Category$=this.categoryService.GetCategory();
  }

  ngOnInit() {
    this.createRegisterFrom();
    
  }
  createRegisterFrom(){
    this.Addform=this.fb.group({
      productName:['',[Validators.required,Validators.minLength(3)]],
      price:['',Validators.required,Validators.min(1)],
      categoryId:[''],
      Profile:['']
    });
  }
AddProduct()
{
  debugger;
  this.product=Object.assign({},this.Addform.value);
  console.log(this.product);
  const formData = new FormData();
    formData.append('profile', this.selectedFile);
    formData.append('productName', this.product.productName);
    formData.append('price', this.product.price+"");
    formData.append('categoryId', this.product.categoryId+"");
    this.productService.AddProduct(formData).subscribe(x =>{
      //
      this.alertify.success('product successfuly');
    },error=>{
      this.alertify.error(error); 
    });   
}
onSelectFile(event) {
  
  if (event.target.files.length>0) {
    //this.selectedFile = event.target.files[0];
  this.selectedFile = event.target.files[0];
    //this.Addform.get('Profile').setValue(file);
      console.log(this.selectedFile)
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result.toString();
      reader.readAsDataURL(this.selectedFile);
    }
  
}
}