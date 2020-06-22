import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  bsConfig:Partial<BsDatepickerConfig>;
  registerform:FormGroup;
@Output()cancelregister=new EventEmitter()
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
   
    this.bsConfig={
containerClass:'theme-red'
    },
  //this.registerform=new FormGroup({
    //userName:new FormControl("",Validators.required),
    //passWord:new FormControl("",[Validators.required,Validators.minLength(4),Validators.maxLength(8)]),
   // confirmPassword:new FormControl()
   //},this.passWordMatchValidator);
   this.createRegisterFrom();
  
  }

createRegisterFrom(){
  this.registerform=this.fb.group({
    gender:['male'],
    userName:['',Validators.required],
    KnownAs:['',Validators.required],
    dateOfBirth:[null,Validators.required],
   city:['',Validators.required],
    country:['',Validators.required],
    passWord:['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
    confirmPassword:['',Validators.required]
  },{Validators:this.passWordMatchValidator});
}
passWordMatchValidator(g:FormGroup)
{
  return g.get('passWord').value===g.get('confirmPassword').value ? null : {'mismatch': true};
}
 register()
{
  if(this.registerform.valid){
  
  }
  //this.auth.register(this.model).subscribe(()=>{
    //this.alertify.success("register successfuly");
  //},error=>{
   // this.alertify.error(error);
  //})
  console.log(this.registerform.value);
}
Cancel()
{
 // this.alertify.messages('canceld');
  this.cancelregister.emit(false);
}

}
