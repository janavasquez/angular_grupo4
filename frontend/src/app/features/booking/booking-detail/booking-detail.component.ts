import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbAlertModule, NgbCarouselModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from '../../../interfaces/booking.model';
import { Treatment } from '../../../interfaces/treatment.model';
import { Comments } from '../../../interfaces/comments.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [RouterLink, NgbCarouselModule, NgbRatingModule, ReactiveFormsModule, DatePipe, NgbAlertModule],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.css'
})
export class BookingDetailComponent  implements OnInit{

  booking: Booking | undefined;
  treatment: Treatment [] = [];
  comments: Comments [] = [];
  showDeletedMessage: boolean = false;

  commentsForm = new FormGroup({
    rating: new FormControl(0),
    opinion: new FormControl('')
  });

  constructor(private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(!id) {
        return;
      }

      this.httpClient.get<Booking>(`http://localhost:3000/booking/${id}`)
        .subscribe(booking => this.booking = booking);

      this.httpClient.get<Treatment[]>(`http://localhost:3000/treatment/${id}`)
        .subscribe(treatment => this.treatment = treatment);

      this.httpClient.get<Comments[]>(`http://localhost:3000/comments/${id}`)
        .subscribe(comments => this.comments = comments);

      this.loadBooking();

    });
  }
  loadBooking() {
    this.httpClient.get<Booking>('http://localhost:3000/booking')
    .subscribe(bookingFromBackend => this.booking = bookingFromBackend);
  }
  delete(booking: Booking) {
    const remove = confirm("¿Esta seguro de cancelar la reserva?");
    if(!remove || !this.booking)
      return;
    this.httpClient.delete('http://localhost:3000/booking/' + booking.id)
    .subscribe(response => {
      this.showDeletedMessage = true;
      this.loadBooking();
    });
  }
  closeMessage() {
    this.showDeletedMessage = false;
  }

  save() {
    const comment: Comments = {
      id: 0,
      rating: this.commentsForm.get('rating')?.value ?? 0,
      opinion: this.commentsForm.get('opinion')?.value ?? '',
      booking: this.booking
    }
    this.httpClient.post<Comments>('http://localhost:3000/comments', comment)
    .subscribe(comment => {
      this.commentsForm.reset();
      this.httpClient.get<Comments[]>('http://localhost:3000/filter-by-treatment/'+ this.booking?.id)
      .subscribe(comments => this.comments = comments);
    });
  }

}
