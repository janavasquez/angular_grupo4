import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.model';
import { Repository } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { Category } from 'src/category/category.model';

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
// npm i -D @types/multer
@Post()
@UseInterceptors(FileInterceptor('file'))
async create(@UploadedFile() file: Express.Multer.File, @Body() company: Company) {

    if (file) {
        // guardar el archivo y obtener la url
        company.photoUrl = file.filename;
    }
    
    console.log(company);
    return await this.companyRepository.save(company);
}

@Put(':id')
@UseInterceptors(FileInterceptor('file'))
async update(
    @UploadedFile() file: Express.Multer.File, 
    @Param('id', ParseIntPipe) id: number,
    @Body() company: Company
    ) {

        if(!await this.companyRepository.existsBy({id: id})) {
            throw new NotFoundException('Author not found');
        }

        if (file) {
            company.photoUrl = file.filename;
        }
        company.id = id; // Asigna el id para asegurar que sea numérico y actualice en lugar de intentar insertar
        return await this.companyRepository.save(company);
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
    

    


