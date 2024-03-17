import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../interfaces/category.model';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})

export class CategoryFormComponent{

      categoryForm = new FormGroup({
        id: new FormControl(),
        name: new FormControl(''),
        photoUrl: new FormControl (" "),
        minAge: new FormControl()

      });

      save(): void{
        const id = this.categoryForm.get('id')?.value;
        console.log(id);

        const name = this.categoryForm.get('name')?.value;
        console.log(name);

        const photoUrl = this.categoryForm.get('photoUrl')?.value;
        console.log(photoUrl);

        const minAge = this.categoryForm.get('minAge')?.value;
        console.log(minAge);


      }

      constructor(
        private httpClient: HttpClient,
        private activatedRoute:  ActivatedRoute,
        private router: Router
      ){}

      ngOnInit(): void {

      }

    }
