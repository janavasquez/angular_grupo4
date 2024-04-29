import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Booking } from '../../../interfaces/booking.model';
import { AuthenticationService } from '../../../authentication/services/authentication.service';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent implements OnInit {

  bookings: Booking[] = [];
  isAdmin = false;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService) {
      this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
    }

  ngOnInit(): void {
    this.http.get<Booking[]>('http://localhost:3000/booking')
    .subscribe(bookings => this.bookings = bookings);
  }

}
