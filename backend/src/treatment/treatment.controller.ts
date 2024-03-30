import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Treatment } from './treatment.model';
import { Repository } from 'typeorm';

@Controller('treatment')
export class TreatmentController {

    constructor(
        @InjectRepository(Treatment) 
        private treatmentRepository: Repository<Treatment>
    ) {}

    @Get()
    findAll() {
        return this.treatmentRepository.find();
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.treatmentRepository.findOne({
            where: {id: id}
        });
    }

    @Get('filter-by-category/:id')
    findByCategoryId(@Param('id', ParseIntPipe) id: number) {
        return this.treatmentRepository.find({
            where: {category: {id: id}}
        });
    }

    @Get('filter-by-company/:id')
    findByCompanyId(@Param('id', ParseIntPipe) id: number) {
        return this.treatmentRepository.find({
            where: {company: {id: id}}
        });
    }

    @Get('filter-by-title/:id')
    findByTitle(@Param('title') title: string) {
        return this.treatmentRepository.find({
            where: {title: title}
        });
    }

    @Post()
    create(@Body() treatment: Treatment) {
        return this.treatmentRepository.save(treatment);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() treatment: Treatment
    ) {
        const exists = await this.treatmentRepository.existsBy({
            id: id
        });
        if(!exists) {
            throw new NotFoundException('El tratamiento no existe');
        }
        return this.treatmentRepository.save(treatment);
    }

    @Delete(':id')
    async deleteById(@Param('id', ParseIntPipe) id: number) {
        const exists = await this.treatmentRepository.existsBy({
            id: id 
        });
        if(!exists) {
            throw new NotFoundException('El tratamiento no existe');
        }
        try {
            this.treatmentRepository.delete(id);
        } catch (error) {
            throw new ConflictException('No se puede eliminar')
        }
    }

}
