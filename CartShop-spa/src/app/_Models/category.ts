import { Products } from "./products";

export interface Category {
    id:number;
    categoryName:string;
    products? : Products[];
   
}
