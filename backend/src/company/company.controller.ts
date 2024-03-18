import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.model';
import { Repository } from 'typeorm';

@Controller('company')
export class CompanyController {


     constructor(
        @InjectRepository(Company) private companyRepository: Repository<Company>
    ) {}
    
    @Get()
    findAll() {
        return this.companyRepository.find();
    }

    @Get(':id') // :id es una variable, parámetro en la url
    findById( @Param('id', ParseIntPipe) id: number ) {
        return this.companyRepository.findOne({
            // relations: {
            //    author: true
            // },
            where: {
                id: id
            }
        });
    }

    @Post()
    create(@Body() company: Company) {
        return this.companyRepository.save(company);
    }
    

    

}
