import { ApiProperty } from "@nestjs/swagger";
import { Treatment } from "src/treatment/treatment.model";
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
    @Column({type: 'decimal', precision: 14, scale: 2})
    discount: number;

    @ApiProperty()
    @ManyToOne(() => User, {eager: true})
    user: User;

    @ApiProperty()
    @ManyToOne(() => Treatment, {eager: true})
    treatment: Treatment;

}