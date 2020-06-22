import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_Services/alertify.service';
import { CagtegoryService } from '../_Services/cagtegory.service';
import { Category } from '../_Models/category';
import { ActivatedRoute } from '@angular/router';
//import { ErrorInterceptor } from '../_Services/Error.interceptor';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
cat:Category;

  constructor(private categoryService:CagtegoryService,private alertify:AlertifyService,private route:ActivatedRoute) { }

  ngOnInit(): void {
  
    this.categoryService.GetCategory().subscribe(x=>{
      this.cat=x;
      //console.log(this.categorys);
    });
  }
  AddCategory()
  {
    this.categoryService.AddCategory(this.cat).subscribe(x =>{
    
      this.alertify.success('category successfuly');
     
    },error=>{
      this.alertify.error(error);
      //this.errorinterceptor;
      
    });
    
   
  }
}
