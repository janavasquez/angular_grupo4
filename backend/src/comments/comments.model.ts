import { ApiProperty } from "@nestjs/swagger";
import { Booking } from "src/booking/booking.model";
import { Company } from "src/company/company.model";
import { Treatment } from "src/treatment/treatment.model";
import { User } from "src/user/user.model";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comments {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    rating: number;

    @ApiProperty()
    @Column({length: 2000, nullable: true})
    opinion: string;

    @ApiProperty()
    @ManyToOne(() => User, {eager: true})
    user: User;

    @ApiProperty()
    @ManyToMany(() => Company, {eager: true})
    company: Company;

    @ApiProperty()
    @ManyToMany(() => Treatment, {eager: true})
    treatment: Treatment;

    @ApiProperty()
    @ManyToMany(() => Booking, {eager: true})
    booking: Booking;

}