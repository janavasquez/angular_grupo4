import { ApiProperty } from "@nestjs/swagger";
import { Company } from "src/company/company.model";
import { Treatment } from "src/treatment/treatment.model";
import { User } from "src/user/user.model";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booking {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: "2024-01-01"})
    @Column()
    startDate: Date;

    @ApiProperty()
    @Column({type: 'decimal', default: false})
    price: number;

    @ApiProperty()
    @Column({type: 'decimal', precision: 14, scale: 2})
    discount: number;

    @ApiProperty()
    @ManyToOne(() => User, {eager: true})
    user: User;

    @ApiProperty()
    @ManyToOne(() => Treatment, {eager: true})
    treatment: Treatment;

    @ApiProperty()
    @ManyToOne(() => Company, {eager: true})
    company: Company;

}