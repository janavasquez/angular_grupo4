import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from './comments.model';

@Controller('comment')
export class CommentsController {

    constructor(
        @InjectRepository(Comments)
        private commentRepository: Repository<Comments>
    ) {}

    @Get()
    findAll() {
        return this.commentRepository.find();
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.commentRepository.findOne({
            where: {id: id}
        });
    }

    @Get('filter-by-user/:id')
    findByUserId(@Param('id', ParseIntPipe) id: number) {
        return this.commentRepository.find({
            where: {user: {id: id}}
        });
    }

    @Get('filter-by-company/:id')
    findByCompanyId(@Param('id', ParseIntPipe) id: number) {
        return this.commentRepository.find({
            where: {company: {id: id}}
        });
    }

    @Get('filter-by-treatment/:id')
    findByCategoryId(@Param('id', ParseIntPipe) id: number) {
        return this.commentRepository.find({
            where: {treatment: {id: id}}
        });
    }

    @Post()
    create(@Body() comment: Comments) {
        return this.commentRepository.save(comment);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() comment: Comments
    ) {
        const exists = await this.commentRepository.existsBy({
            id: id
        });
        if(!exists) {
            throw new NotFoundException('El comentario no existe');
        }
        return this.commentRepository.save(comment);
    }

    @Delete(':id')
    async deleteById(@Param('id', ParseIntPipe) id: number) {
        const exists = await this.commentRepository.existsBy({
            id: id 
        });
        if(!exists) {
            throw new NotFoundException('El comentario no existe');
        }
        try {
            this.commentRepository.delete(id);
        } catch (error) {
            throw new ConflictException('No se puede eliminar')
        }
    }

}
