import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UnauthorizedException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.model';
import { Register } from './register.dto';
import { Role } from './role.enum';
import { Login } from './login.dto';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';

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

    @Get(':id') // :id es una variable, parámetro en la url
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

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile() file: Express.Multer.File, @Body() user: User) {
        console.log(file);
        console.log(user);
        
        if(file) {
            user.photoUrl = file.filename;
         }
         return await this.userRepository.save(user);
    }


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
            photoUrl: ''
        };
        await this.userRepository.save(user);
    }


    //login
    
    @Post('login')
    async login(@Body() login: Login) {

        // comprobar si el email existe
        const exists = await this.userRepository.existsBy({
            email: login.email
        });
        if(!exists)
            throw new NotFoundException("Usuario no encontrado."); // 404 

        // Recuperar el usuario
        const user = await this.userRepository.findOne({
            where: {
                email: login.email
            }
        });

        // Comparar contraseñas
        if (user.password !== login.password) {
            throw new UnauthorizedException("Credenciales incorrectas"); // 401
        }

        // Crear y devolver token de acceso (JWT)
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
