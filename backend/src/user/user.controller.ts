import { Body, ConflictException, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.model';
import { Register } from './register.dto';
import { Role } from './role.enum';

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
            where: {
                id: id
            }
        });
    }

    @Post()
    create(@Body() user: User) {
        return this.userRepository.save(user);
    }

    @Post('register')
    async register(@Body() register: Register) {
        
        const exists = await this.userRepository.existsBy({
            email: register.email
        });

        if(exists)
            throw new ConflictException("Email ocupado");

        // crear usuario en base de datos
        const user: User = {
            id: 0,
            email: register.email,
            password: register.password,
            phone: '',
            role: Role.USER,
            fullName: '',
            active: false,
            registerDate: undefined,
            nif: '',
            street: '',
            city: '',
            postalCode: '',
            photo: ''
        };
        await this.userRepository.save(user);
    }
}
