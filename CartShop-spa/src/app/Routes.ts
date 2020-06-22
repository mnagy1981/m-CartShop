
import { ProductsComponent } from "./products/products.component";
import { AdminProductsComponent } from "./admin/admin-products/admin-products.component";
import { Routes } from '@angular/router';
import { ShopingCartComponent } from "./shoping-cart/shoping-cart.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./_Guard/auth.guard";
import { EditUserComponent } from "./Members/Edit-user/edit-user/edit-user.component";
import { PreventUnsavedGuard } from "./_Guard/prevent-unsaved.guard";
import { UserEditResolver } from "./_Resolvers/user-Edit.resolver";
import { ProductFormComponent } from "./admin/product-form/product-form.component";
import { CategoryComponent } from "./category/category.component";
import { EditProductComponent } from "./ProductEdit/edit-product/edit-product.component";
import { ProductListResolver } from "./_Resolvers/Product-List.resolver";


export const appRoutes:Routes=[
    
    {path:'home',component:HomeComponent},
{
    path:"",
    runGuardsAndResolvers:'always',
    canActivate: [AuthGuard],
    children:[
        {path:'',component: ProductsComponent, resolve: {products: ProductListResolver}},
   {path:'products',component: ProductsComponent, resolve: {products: ProductListResolver}},
   {path:'shoppingcart',component: ShopingCartComponent},
   {path:'Edit',component: EditUserComponent, resolve: {user: UserEditResolver}
   ,canDeactivate:[PreventUnsavedGuard]},
   {path:'category',component: CategoryComponent},
   {path:'admin/products',component:AdminProductsComponent},
   {path:'admin/products/new',component:ProductFormComponent},
   {path:'admin/products/EditProduct/:id',component:EditProductComponent}
             ]
},

{path:'**',redirectTo:'home',pathMatch:'full'}
];

