import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Request, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.model';
import { Register } from './register.dto';
import { Role } from './role.enum';
import { Login } from './login.dto';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService) {

    }
    @Get()
    findAll() {
        return this.userRepository.find();
    }

    @Get(':id') 
    findById( @Param('id', ParseIntPipe) id: number ) {
        return this.userRepository.findOne({
            where: {
                id: id
            }
        });
    }

    @Get('filter-by-city/:city')
    findByCity(@Param('city') city: string) {
        return this.userRepository.find({
            where: {
                city: city
            }
        });
    }

    @Get('account')
    @UseGuards(AuthGuard('jwt'))
    public getCurretnAccountUser(@Request() request) {
        return request.user;
    }

    @Put()
    @UseGuards(AuthGuard('jwt'))
    public update(@Body() user: User, @Request() request) {
        if(request.user.role !== Role.ADMIN && user.id !== request.user.id) {
            throw new UnauthorizedException();
        }
        return this.userRepository.save(user);
    }

    /*@Put(':id')
    @UseInterceptors(FileInterceptor('file'))
    async update(
        @UploadedFile() file: Express.Multer.File, 
        @Param('id', ParseIntPipe) id: number,
        @Body() user: User
        ) {

            if(!await this.userRepository.existsBy({id: id})) {
                throw new NotFoundException('User not found');
            }

            if (file) {
                user.photoUrl = file.filename;
            }
            user.id = id; 
            return await this.userRepository.save(user);
    }*/

    @Delete(':id')
    async deleteById(
        @Param('id', ParseIntPipe) id: number
    ) {

       const exists = await this.userRepository.existsBy({
            id: id
         });

         if(!exists) {
             throw new NotFoundException('User not found');
         }

        try {
            this.userRepository.delete(id);
        } catch (error) {
            throw new ConflictException('No se puede borrar el usuario.');
        }
        
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile() file: Express.Multer.File, @Body() user: User) {
        console.log(file);
        
        if(file) {
            user.photoUrl = file.filename;
         }

         console.log(user);
         return await this.userRepository.save(user);
    }

    @Post('register')
    async register(@Body() register: Register) {
        
        const exists = await this.userRepository.existsBy({
            email: register.email
        });

        if(exists)
            throw new ConflictException("Email ocupado");

        const password = bcrypt.hashSync(register.password, 10);

        const user: User = {
            id: 0,
            email: register.email,
            password: password,
            phone: null,
            role: Role.USER,
            fullName: null,
            active: null,
            birthDate: null,
            nif: null,
            street: null,
            city: null,
            postalCode: null,
            photoUrl: null,
            
        };
        await this.userRepository.save(user);
    }
    
    @Post('login')
    async login(@Body() login: Login) {

        const exists = await this.userRepository.existsBy({
            email: login.email
        });
        if(!exists)
            throw new NotFoundException("Usuario no encontrado."); // 404 

        const user = await this.userRepository.findOne({
            where: {
                email: login.email
            }
        });

        if (! bcrypt.compareSync(login.password, user.password)) {
            throw new UnauthorizedException("Credenciales incorrectas."); // 401
        }

        let userData = {
            sub: user.id,
            email: user.email,
            role: user.role
        };

        let token = {
            token: await this.jwtService.signAsync(userData)
        }
        return token;

    }
}
