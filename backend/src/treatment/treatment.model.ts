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
    @Column({unique: true, nullable: true})
    title: string;

    @ApiProperty()
    @Column({type: 'decimal', default: 0, nullable: true})
    price: number;

    @ApiProperty()
    @Column({nullable: true})
    image: string;

    @ApiProperty()
    @Column({length: 80, nullable: true})
    descriptionShort: string;

    @ApiProperty()
    @Column({length: 300, nullable: true})
    descriptionLong: string;

    @ApiProperty()
    @Column({nullable: true})
    afterCare: string;

    @ApiProperty()
    @Column({nullable: true})
    durationInMin: number;

    @ApiProperty({example: [{id: 1}]})
    @ManyToOne(() => Category, {eager: true})
    @JoinTable()
    categories: Category[];

    @ApiProperty({example: {id: 1}})
    @ManyToOne(() => Company, {eager: true})
    company: Company;

}