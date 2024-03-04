import { Component, OnInit } from '@angular/core';
import { Company } from '../interfaces/company.model';
import { Category } from '../interfaces/category.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-treatment-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, NgbDatepickerModule],
  templateUrl: './treatment-form.component.html',
  styleUrl: './treatment-form.component.css'
})
export class TreatmentFormComponent implements OnInit{

  companies: Company[] = [];
  categories: Category [] = [];

  treatmentForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.min(0), Validators.max(500)]),
    descriptionShort: new FormControl(),
    descriptionLong: new FormControl(),
    afterCare: new FormControl(),
    company: new FormControl(),
    category: new FormControl<Category[]>([])
  });

  isUpdate: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router 
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
