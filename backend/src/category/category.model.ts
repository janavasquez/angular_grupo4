
import { Treatment } from "src/treatment/treatment.model";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;
    
    @Column()
    photo: string;

    @Column()
    treatment: Treatment;

    @Column()
    description: string;


    @Column()
    mingAge: number;


    // para filtar por categoria debe de coincidir con el detail component

}
