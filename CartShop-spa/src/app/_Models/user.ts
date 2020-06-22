import { PhotoUser } from "./photo-user";

export interface User {
    id:number;
     userName:string;
     gender:string;
    created:Date;
      city :string;
     country :string;
     photoUrl :string;
     photosUser?:PhotoUser[];
}
