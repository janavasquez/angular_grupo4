
import { Treatment } from "src/treatment/treatment.model";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;
    
    @Column({nullable: true})
    photoUrl: string;

    @Column({nullable: true})
    description: string;


    @Column({nullable: true}) // opcional
    minAge: number;


    // para filtar por categoria debe de coincidir con el detail component

}
