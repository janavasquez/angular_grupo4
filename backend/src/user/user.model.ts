import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    fullName: string;

    @ApiProperty()
    @Column({unique: true})
    email: string;

    @ApiProperty()
    @Column({nullable: true})
    phone: string;

    @ApiProperty()
    @Column({nullable: true})
    active: boolean;

    @ApiProperty()
    @Column({type: 'date', nullable: true})
    registerDate: Date;

    @ApiProperty()
    @Column()
    nif: string;

    @ApiProperty()
    @Column()
    street: string;

    @ApiProperty()
    @Column()
    city: string;

    @ApiProperty()
    @Column()
    postalCode: string;

    @ApiProperty()
    @Column({nullable: true})
    photoUrl: string;

    @ApiProperty()
    @Column()
    password: string;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER
    })
    role: Role; 


}