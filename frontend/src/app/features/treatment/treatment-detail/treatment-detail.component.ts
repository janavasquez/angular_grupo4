import { HttpClient } from '@angular/common/http';
import { Treatment } from '../../../interfaces/treatment.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbCarouselModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Booking } from '../../../interfaces/booking.model';
import { Comments } from '../../../interfaces/comments.model';
import { DatePipe } from '@angular/common';
import { Category } from '../../../interfaces/category.model';

@Component({
  selector: 'app-treatment-detail',
  standalone: true,
  imports: [RouterLink, NgbCarouselModule, ReactiveFormsModule, NgbRatingModule, DatePipe],
  templateUrl: './treatment-detail.component.html',
  styleUrl: './treatment-detail.component.css'
})
export class TreatmentDetailComponent implements OnInit{

  treatment: Treatment | undefined;
  booking: Booking [] = [];
  comments: Comments [] = [];
  categories: Category [] = [];

  commentsForm = new FormGroup({
    rating: new FormControl(0),
    opinion: new FormControl('')
  });

  constructor(private httpClient:HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(!id) {
        return;
      }

      this.httpClient.get<Treatment>(`http://localhost:3000/treatment/${id}`)
        .subscribe(treatment => this.treatment = treatment);

      this.httpClient.get<Booking[]>(`http://localhost:3000/booking/${id}`)
        .subscribe(booking => this.booking = booking);

      this.httpClient.get<Comments[]>(`http://localhost:3000/comment/filter-by-treatment/${id}`)
        .subscribe(comments => this.comments = comments);

    });
  }

  save() {
    const comment: Comments = {
      id: 0,
      rating: this.commentsForm.get('rating')?.value ?? 0,
      opinion: this.commentsForm.get('opinion')?.value ?? '',
      treatment: this.treatment
    }
    this.httpClient.post<Comments>('http://localhost:3000/comment', comment)
    .subscribe(comment => {
      this.commentsForm.reset();
      this.httpClient.get<Comments[]>('http://localhost:3000/filter-by-treatment/'+ this.treatment?.id)
      .subscribe(comments => this.comments = comments);
    });
  }



}


