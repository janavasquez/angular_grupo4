import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors, Request, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Treatment } from './treatment.model';
import { Repository } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/user/role.enum';

@Controller('treatment')
export class TreatmentController {

    constructor(
        @InjectRepository(Treatment) 
        private treatmentRepository: Repository<Treatment>
    ) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    findAll(@Request() request) {
        console.log(request.user);
        return this.treatmentRepository.find();
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.treatmentRepository.findOne({
            where: {id: id}
        });
    }

    @Get('filter-by-category/:id')
    findByCategoryId(@Param('id', ParseIntPipe) id: number) {
        return this.treatmentRepository.find({
            where: {categories: {id: id}}
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
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Request() request,
        @UploadedFile() file: Express.Multer.File,
        @Body() treatment: Treatment) {
            console.log(typeof request.user.role);
            if(request.user.role !== Role.ADMIN)
                throw new UnauthorizedException('Sin permisos para crear');
            if(file) {
                treatment.image = file.filename;
        }
        console.log(treatment)
        return await this.treatmentRepository.save(treatment);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('file'))
    async update(
        @UploadedFile() file: Express.Multer.File,
        @Param('id', ParseIntPipe) id: number,
        @Body() treatment: Treatment
    ) {
        if(!await this.treatmentRepository.existsBy({id: id})) {
            throw new NotFoundException('Tratamiento no encontrado');
        }
        if(file) {
            treatment.image = file.filename;
        }
        treatment.id = id;
        return await this.treatmentRepository.save(treatment)
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
