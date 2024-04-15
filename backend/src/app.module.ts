import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treatment } from './treatment/treatment.model';
import { BookingController } from './booking/booking.controller';
import { CategoryController } from './category/category.controller';
import { CompanyController } from './company/company.controller';
import { TreatmentController } from './treatment/treatment.controller';
import { UserController } from './user/user.controller';
import { CommentsController } from './comments/comments.controller';
import { Company } from './company/company.model';
import { Booking } from './booking/booking.model';
import { Category } from './category/category.model';
import { User } from './user/user.model';
import { Comments } from './comments/comments.model';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // carpeta destino donde guardar los archivos
        destination: './uploads',
        // Opcional: generar un nombre único para el archivo antes de guardarlo:
        // 1f82d390-d902-4aed-ad23-d543f56f2433.png
        filename: (req, file, callback) => {
          let fileName = uuidv4() + extname(file.originalname);
          callback(null, fileName);
        }
      })
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', 
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'grupo4_backend', // crear esta base de datos en MySQL primero
      entities: [Treatment, Company, Booking, Category, User, Comments],
      synchronize: true, // generar tablas en base de datos
      logging: true
    }),
    TypeOrmModule.forFeature([Treatment, Company, Booking, Category, User, Comments])
  ],

  
  controllers: [AppController, BookingController, CategoryController, CompanyController, TreatmentController, UserController, CommentsController],
  providers: [AppService],
})
export class AppModule {}
