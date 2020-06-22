import { PhotoProduct } from "./photo-product";

export interface Products {
     id:number;
     productName:string;
     price:number;
     categoryId:number;
     photoUrl :string;
     photosProduct?:PhotoProduct[];
}
