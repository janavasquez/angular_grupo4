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
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
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
      database: 'grupo4_backend', 
      entities: [Treatment, Company, Booking, Category, User, Comments],
      synchronize: true, 
      logging: true
    }),
    TypeOrmModule.forFeature([Treatment, Company, Booking, Category, User, Comments])
  ],

  
  controllers: [AppController, BookingController, CategoryController, CompanyController, TreatmentController, UserController, CommentsController],
  providers: [AppService],
})
export class AppModule {}
