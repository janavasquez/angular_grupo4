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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', 
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'grupo4_backend', // crear esta base de datos en MySQL primero
      entities: [Treatment, Company],
      synchronize: true, // generar tablas en base de datos
      logging: true
    }),
    TypeOrmModule.forFeature([Company]),
  ],
  
  controllers: [AppController, BookingController, CategoryController, CompanyController, TreatmentController, UserController, CommentsController],
  providers: [AppService],
})
export class AppModule {}
