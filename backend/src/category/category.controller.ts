
import { InjectRepository } from '@nestjs/typeorm';
import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Category } from './category.model';
import { Repository } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';

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


// put


// npm i -D @types/multer
@Post()
@UseInterceptors(FileInterceptor('file'))
async create(@UploadedFile() file: Express.Multer.File, @Body() category: Category) {

    if (file) {
        // guardar el archivo y obtener la url
        category.photoUrl = file.filename;
    }
    
    console.log(category);
    return await this.categoryRepo.save(category);
}

@Put(':id')
@UseInterceptors(FileInterceptor('file'))
async update(
    @UploadedFile() file: Express.Multer.File, 
    @Param('id', ParseIntPipe) id: number,
    @Body() category: Category
    ) {

        if(!await this.categoryRepo.existsBy({id: id})) {
            throw new NotFoundException('category not found');
        }

        if (file) {
            category.photoUrl = file.filename;
        }
        category.id = id; // Asigna el id para asegurar que sea numérico y actualice en lugar de intentar insertar
        return await this.categoryRepo.save(category);
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
        // Opción 1: Borrar categorias
        // Primero desasociar o borrar aquellas cosas que apunten a categoria
        // this.categoryRepository.delete(id);

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