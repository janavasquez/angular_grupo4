import { ApiProperty } from "@nestjs/swagger";
import { Booking } from "src/booking/booking.model";
import { Company } from "src/company/company.model";
import { Treatment } from "src/treatment/treatment.model";
import { User } from "src/user/user.model";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comments {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({nullable: true})
    rating: number;

    @ApiProperty()
    @Column({length: 2000, nullable: true})
    opinion: string;

    @ApiProperty()
    @ManyToOne(() => User, {eager: true, nullable: true})
    user: User;

    @ApiProperty()
    @ManyToOne(() => Company, {eager: true, nullable: true})
    company: Company;

    @ApiProperty()
    @ManyToOne(() => Treatment, {eager: true, nullable: true})
    treatment: Treatment;

    @ApiProperty()
    @ManyToOne(() => Booking, {eager: true, nullable: true})
    booking: Booking;

}