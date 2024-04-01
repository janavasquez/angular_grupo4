
import { Column, Entity, JoinTable,OneToMany,PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Treatment } from "src/treatment/treatment.model";

@Entity()
export class Company {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
   name: string;

   @ApiProperty()
   @Column()
   cif: string;

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
  @Column()
  values: string;

  @ApiProperty()
  @OneToMany(() => Treatment, treatment => treatment.company)
  treatments: Treatment[];

  @ApiProperty()
  @Column({ default: true })
  active: boolean;

  @ApiProperty()
  @Column()
  photo: string;
}