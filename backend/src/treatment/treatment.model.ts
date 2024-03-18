import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/category/category.model";
import { Company } from "src/company/company.model";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Treatment {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({unique: true})
    title: string;

    @ApiProperty()
    @Column({type: 'decimal', default: false})
    price: number;

    @ApiProperty()
    @Column()
    images: string;

    @ApiProperty()
    @Column({length: 80})
    descriptionShort: string;

    @ApiProperty()
    @Column({length: 300})
    descriptionLong: string;

    @ApiProperty()
    @Column()
    afterCare: string;

    @ApiProperty()
    @Column()
    durationInMin: number;

    @ApiProperty({example: [{id: 1}]})
    @ManyToMany(() => Category, {eager: true})
    @JoinTable()
    category: Category[];

    @ApiProperty({example: {id: 1}})
    @ManyToOne(() => Company, {eager: true})
    company: Company;

}