import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Category } from './../interfaces/category.model';
import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Treatment } from '../interfaces/treatment.model';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [HttpClientModule,RouterLink, NgbCarouselModule],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.css'
})

export class CategoryDetailComponent implements OnInit {

  category: Category| undefined;

  treatments: Treatment[] = [];

  constructor(private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}



  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params ['id'];
      if(!id){
        return // si no hay categoria setermina el metodo
      }

      // traer categoria y tratamiento


      this.httpClient.get<Category>(`http://localhost:3000/categories/${id}`)
      .subscribe(category => this.category = category);

      this.httpClient.get<Treatment[]>(`http://localhost:3000/treatment/filter-by-category/${id}`)
      .subscribe(books => this.treatments = this.treatments);
    });

  }




}
