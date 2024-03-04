import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Category } from './../interfaces/category.model';
import { Component, OnInit } from '@angular/core';
import { NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [HttpClientModule,RouterLink, NgbCarouselModule],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.css'
})

export class CategoryDetailComponent implements OnInit {

  Category: Category| undefined;
Categories: any;

  constructor(private http:HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params ['id'];
      this.http.get<Category>('http://localhost:3000/categories/${id}')
    });

  }




}
