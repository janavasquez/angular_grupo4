import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column({unique: true})
    email: string;
    
    @Column({nullable: true})
    phone: string;

    @Column({nullable: true})
    active: boolean;

    @Column({type: 'date', nullable: true})
    registerDate: Date;

    @Column()
    nif: string;

    @Column()
    street: string;

    @Column()
    city: string;

    @Column()
    postalCode: string;

    @Column({nullable: true})
    photo: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER
    })
    role: Role;


}