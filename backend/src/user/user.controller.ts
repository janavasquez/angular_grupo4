import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.model';

@Controller('user')
export class UserController {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {

    }
    @Get()
    findAll() {
        return this.userRepository.find();
    }

    @Get(':id') // :id es una variable, parámetro en la url
    findById( @Param('id', ParseIntPipe) id: number ) {
        return this.userRepository.findOne({
            // relations: {
            //    author: true
            // },
            where: {
                id: id
            }
        });
    }

    @Post()
    create(@Body() user: User) {
        return this.userRepository.save(user);
    }
}
