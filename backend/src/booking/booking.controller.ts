import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.model';
import { Repository } from 'typeorm';
import { Treatment } from 'src/treatment/treatment.model';

@Controller('booking')
export class BookingController {
    constructor(
        @InjectRepository(Booking) private bookingRepository: Repository<Booking>
    ) {}

    @Get()
    findAll() {
        return this.bookingRepository.find();
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.bookingRepository.findOne({
            where: {id: id}
        });
    }

    @Get('filter-by-user/:id')
    findByUserId(@Param('id', ParseIntPipe) id: number) {
        return this.bookingRepository.find({
            where: {user: {id: id}}
        });
    }

    @Get('filter-by-treatment/:id')
    findByTreatmentId(@Param('id', ParseIntPipe) id: number) {
        return this.bookingRepository.find({
            where: {treatment: {id: id}}
        });
    }

    @Get('filter')
    findWithFilter(@Query() filters: any) {
        return this.bookingRepository.find({
            where: filters
        });
    }

    @Post()
    create(@Body() treatment: Treatment) {
        return this.bookingRepository.save(treatment);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() treatment: Treatment
    ) {
        const exists = await this.bookingRepository.existsBy({
            id: id 
        });
        if(!exists) {
            throw new NotFoundException('Reserva no encontrada');
        }
        return this.bookingRepository.save(treatment);
    }

    @Delete(':id')
    async deleteById(@Param('id', ParseIntPipe) id: number) {
        const exists = await this.bookingRepository.existsBy({
            id: id 
        });
        if(!exists) {
            throw new NotFoundException('Reserva no encontrada')
        }
        try {
            this.bookingRepository.delete(id);
        } catch (error) {
            throw new ConflictException('No se puede eliminar reserva')
        }
    }

}
