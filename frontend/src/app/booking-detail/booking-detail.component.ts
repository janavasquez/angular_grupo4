import { DatePipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbAccordionModule, NgbAlertModule, NgbCarouselModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from '../interfaces/booking.model';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [HttpClientModule, RouterLink, DatePipe, NgbAccordionModule, NgbAlertModule, NgbDatepickerModule, NgbCarouselModule],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.css'
})
export class BookingDetailComponent  implements OnInit{

  booking: Booking | undefined;

  constructor(private actvatedRoute: ActivatedRoute,
    private http: HttpClient) {}

  ngOnInit(): void {
    this.actvatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.http.get<Booking>(`http://localhost:3000/booking/${id}`)
      .subscribe(booking => this.booking = booking);
    });
  }

}
