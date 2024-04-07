import { DatePipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbAccordionModule, NgbAlertModule, NgbCarouselModule, NgbDatepickerModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from '../interfaces/booking.model';
import { Treatment } from '../interfaces/treatment.model';
import { Comments } from '../interfaces/comments.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [HttpClientModule, RouterLink, DatePipe, NgbAccordionModule, NgbAlertModule, NgbDatepickerModule, NgbCarouselModule, NgbRatingModule, ReactiveFormsModule],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.css'
})
export class BookingDetailComponent  implements OnInit{

  booking: Booking | undefined;
  treatment: Treatment [] = [];
  comments: Comments [] = [];

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

      this.httpClient.get<Treatment[]>(`http://localhost:3000/treatments/${id}`)
        .subscribe(treatment => this.treatment = treatment);

      this.httpClient.get<Comments[]>(`http://localhost:3000/comments/${id}`)
        .subscribe(comments => this.comments = comments);

    });
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
