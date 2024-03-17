import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Treatment {

    @PrimaryGeneratedColumn()
    id: number;

}