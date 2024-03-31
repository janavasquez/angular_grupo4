
import { InjectRepository } from '@nestjs/typeorm';
import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Category } from './category.model';
import { Repository } from 'typeorm';

@Controller('category')

export class CategoryController {
    constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>
){}

@Get()
findAll() {return this.categoryRepo.find();

}

@Get(':id')
findByid( @Param('id', ParseIntPipe) id: number) {
    return this.categoryRepo.findOne({
        where: {
            id: id
        }
    });

}
@Get('filter-by-name/:name')
findByname( @Param('name', ParseIntPipe) name : string) {
    return this.categoryRepo.find({
        where: {
            name: name 
        }
    });

}
@Post()
create(@Body()category: Category){
   return this.categoryRepo.save(category);
}

@Delete(':name')
async deleteById(
    @Param('name', ParseIntPipe) name: string
) {
    const exists = await this.categoryRepo.existsBy({
        name: name
     });

     if(!exists) {
         throw new NotFoundException('Category not found');
     }

    try {
        // Opción 1: Borrar categotias
        // Primero desasociar o borrar aquellas cosas que apunten a categoria
        // this.bookRepository.delete(id);

        // Opción 2: Despublicar categoria
        const category = await this.categoryRepo.findOne({
            where: {name: name}
        });
        //Category.= false;
       // await this.save(Category);
        
    } catch (error) {
        console.log("Error al borrar la categoria");
        throw new ConflictException('No se puede borrar.');
    }
    

}
}