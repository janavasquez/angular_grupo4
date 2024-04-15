
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
   @Column({nullable:true})
   cif: string;

@ApiProperty()
  @Column({nullable:true})
  street: string;

@ApiProperty()
  @Column({nullable:true})
  city: string;

@ApiProperty()
  @Column({nullable:true}) 
  postalCode: string;

@ApiProperty()
  @Column({nullable:true})
  values: string;

  @ApiProperty()
  @OneToMany(() => Treatment, treatment => treatment.company)
  treatments: Treatment[];

  @ApiProperty()
  @Column({ default: true })
  active: boolean;

  @ApiProperty()
  @Column({nullable:true})
  photoUrl: string;
}