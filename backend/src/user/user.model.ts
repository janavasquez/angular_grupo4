import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    email: string;
    
    @Column()
    phone: string;

    @Column()
    active: boolean;

    @Column()
    registerDate: Date;

    @Column()
    nif: string;

    @Column()
    street: string;

    @Column()
    city: string;

    @Column()
    postalCode: string;

    @Column()
    photo: string;

    @Column()
    password: string;


}