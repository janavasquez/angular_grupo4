import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Comments } from './../../../../backend/src/comments/comments.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Category } from './../interfaces/category.model';
import { Component, OnInit } from '@angular/core';
import { Treatment } from '../interfaces/treatment.model';
import { NgbCarouselModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [HttpClientModule, RouterLink, NgbRatingModule, NgbCarouselModule, ReactiveFormsModule, DatePipe],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.css'
})

export class CategoryDetailComponent implements OnInit {

  category: Category | undefined;
  treatments: Treatment[] = [];

  updateUrl: string = ""
  comments: Comments [] = [];

  commentsForm = new FormGroup({
    rating: new FormControl(0),
    opinion: new FormControl('')
  });


  constructor(private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
  private route: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        return; // si no hay categoria se termina el metodo
      }

      // traer categoria y tratamiento

      this.httpClient.get<Category>('http://localhost:3000/category/' + id)
        .subscribe(category => { this.category = category; this.updateUrl = `/categories/${category.id}/update` });

      this.httpClient.get<Treatment[]>('http://localhost:3000/treatment/filter-by-category/' + id)
      .subscribe(treatments => this.treatments = treatments);

      this.httpClient.get<Comments[]>(`http://localhost:3000/comment/filter-by-category/${id}`)
        .subscribe(comments => this.comments = comments);

    });


  }

}

