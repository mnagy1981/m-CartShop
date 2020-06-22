import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BsDatepickerModule, PaginationModule } from 'ngx-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { TabsModule, BsDropdownModule } from 'ngx-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductsComponent } from './products/products.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
//import { AppRoutingModule } from './/app-routing.module';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './Routes';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

//import { EditUserComponent } from './Memebers/edit-user/edit-user.component';
import { PhotoUserEditComponent } from './Members/photo-user-edit/photo-user-edit.component';
import { EditUserComponent } from './Members/Edit-user/edit-user/edit-user.component';
import { AuthService } from './_Services/auth.service';
import { UserService } from './_Services/user.service';
import { AuthGuard } from './_Guard/auth.guard';
import { AlertifyService } from './_Services/alertify.service';
import { UserEditResolver } from './_Resolvers/user-Edit.resolver';
import { PreventUnsavedGuard } from './_Guard/prevent-unsaved.guard';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryComponent } from './category/category.component';
//import { ErrorInerceptorProvider } from './_Services/Error.interceptor';
import { EditProductComponent } from './ProductEdit/edit-product/edit-product.component';
import { EditPhotoProductComponent } from './ProductEdit/edit-photo-product/edit-photo-product.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { productsFillterComponent } from './products/products Fillter/productsFillter.component';
import { ProductListResolver } from './_Resolvers/Product-List.resolver';



export function tokenGetter(){
  return localStorage.getItem('token');
}
export class CustomHammerConfig extends HammerGestureConfig  {
  overrides = {
      pinch: { enable: false },
      rotate: { enable: false }
  };
}
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductsComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ShopingCartComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    EditUserComponent,
    PhotoUserEditComponent,
ProductFormComponent,
CategoryComponent,
EditProductComponent,
EditPhotoProductComponent,
ProductCartComponent,
productsFillterComponent
  ],
  imports: [
    BrowserModule,
    //دة الخاصة بالفورم ng form
    FormsModule,
     CustomFormsModule,
     NgbModule,

   ReactiveFormsModule,
    HttpClientModule,
    FileUploadModule,
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
  PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    JwtModule.forRoot({
      config:{
        tokenGetter:tokenGetter,
        whitelistedDomains:['localhost:5000'],
        blacklistedRoutes:['localhost:5000/api/auth']
      }
    })
//AppRoutingModule
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    PreventUnsavedGuard,
    AlertifyService,
    //ErrorInerceptorProvider
   // 
  
   ProductListResolver,
    UserEditResolver,

    { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
