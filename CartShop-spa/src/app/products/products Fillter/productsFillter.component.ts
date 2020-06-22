import { Component, OnInit, Input } from '@angular/core';
import { CagtegoryService } from 'src/app/_Services/cagtegory.service';
//import { CagtegoryService } from '../_Services/cagtegory.service';

@Component({
  selector: 'app-productsFillter',
  templateUrl: './productsFillter.component.html',
  styleUrls: ['./productsFillter.component.css']
})
export class productsFillterComponent implements OnInit {
  Categories$;
  
  @Input('category')category;
 
  constructor(private categoryService:CagtegoryService) {
    this.getAllCategories();
     
     }
  ngOnInit() {}
  getAllCategories()
  {
    this.Categories$=this.categoryService.GetCategory();

  }
}
