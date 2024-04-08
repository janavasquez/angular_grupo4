import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    fullName: string;

    @Column({nullable: true})
    email: string;
    
    @Column({nullable: true})
    phone: string;

    @Column({nullable: true})
    active: boolean;

    @Column({type: 'date', nullable: true})
    registerDate: Date;

    @Column({nullable: true})
    nif: string;

    @Column({nullable: true})
    street: string;

    @Column({nullable: true})
    city: string;

    @Column({nullable: true})
    postalCode: string;

    @Column({nullable: true})
    photo: string;

    @Column({nullable: true})
    password: string;


}