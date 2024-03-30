
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column()
    mingAge: number;

    @Column()
    photo: string;

    // para filtar por categoria debe de coincidir con el detail component

}
