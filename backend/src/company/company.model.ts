
/*
export interface Category {
    id: number;
    name: string;
    cif: string;
    street: string;
    city: string;
    postalCode: string;
    values: string;
    treatments: any;
    active: boolean;
    photo:string;
}
*/

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company {

    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}