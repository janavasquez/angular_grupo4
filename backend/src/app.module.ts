import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treatment } from './treatment/treatment.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', 
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'grupo4_backend', // crear esta base de datos en MySQL primero
      entities: [Treatment],
      synchronize: true, // generar tablas en base de datos
      logging: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
