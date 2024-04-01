import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
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

    @Get(':id') 
    findById( @Param('id', ParseIntPipe) id: number ) {
        return this.companyRepository.findOne({
            
            where: {
                id: id
            }
        });
    }
    
    @Get('filter-by-postalCode/:postalCode')
    findByPostalCode(@Param('postalCode') postalCode: string) {
        return this.companyRepository.find({
            where: {
                postalCode: postalCode
            }
        });
    }

    @Get('filter-by-city/:city')
    findByCity(@Param('city') city: string) {
        return this.companyRepository.find({
            where: {
                city: city
            }
        });
    }

    @Post()
    create(@Body() company: Company) {
        return this.companyRepository.save(company);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() company: Company
    ) {
        const exists = await this.companyRepository.existsBy({
            id: id
        });
        if(!exists) {
            throw new NotFoundException('La compañia no existe');
        }
        return this.companyRepository.save(company);
    }

    @Delete(':id')
    async deleteById(@Param('id', ParseIntPipe) id: number) {
        const exists = await this.companyRepository.existsBy({
            id: id 
        });

        if(!exists) {
            throw new NotFoundException('La compañia no existe');
        }
        try {
            this.companyRepository.delete(id);
        } catch (error) {
            throw new ConflictException('No se puede eliminar')
        }
    }

}
    

    


