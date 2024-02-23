import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from '../interfaces/category.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [HttpClientModule,RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent  implements OnInit{

  categories: Category[] = [];

   constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Category[]>('http://localhost:3000/categories')
   .subscribe(categories => this.categories = categories);}

}

