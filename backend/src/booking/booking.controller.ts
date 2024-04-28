import { Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.model';
import { Repository } from 'typeorm';
import { Treatment } from 'src/treatment/treatment.model';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/user/role.enum';

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

    @UseGuards(AuthGuard('jwt'))
    @Get('filter-by-current-user')
    findByCurrentUserId(@Request() request) {
        if(request.user.role === Role.ADMIN) {
            return this.bookingRepository.find();
        } else {
            console.log(request.user.id);
            return this.bookingRepository.find({
                where: {
                    user: {
                        id: request.user.id
                    }
                }
            });
        }
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(
        @Body() booking: Booking,
        @Request() request) {
            booking.user = request.user;
        return this.bookingRepository.save(booking);
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
