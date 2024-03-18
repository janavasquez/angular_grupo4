import { Entity } from "typeorm";

@Entity()
export class Category {

    id: number;
    name: string;
    photoUrl: string;
    color: string;
    minAge: number;
    
}