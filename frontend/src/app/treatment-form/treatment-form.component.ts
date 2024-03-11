import { Treatment } from './../interfaces/treatment.model';
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
    durationInMin: new FormControl(),
    companies: new FormControl(),
    categories: new FormControl<Category[]>([])
  });

  isUpdate: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const urlCom = 'http://localhost:3000/companies';
    this.httpClient.get<Company[]>(urlCom)
    .subscribe(companies => this.companies = companies);

    const urlCat = 'http://localhost:3000/categories';
    this.httpClient.get<Category[]>(urlCat)
    .subscribe(categories => this.categories = categories);

    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.httpClient.get<Treatment>(`http://localhost:3000/treatments/${id}`)
      .subscribe(treatment => {
        this.isUpdate = true;

        this.treatmentForm.reset({
          id: treatment.id,
          title: treatment.title,
          price: treatment.price,
          descriptionShort: treatment.descriptionShort,
          descriptionLong: treatment.descriptionLong,
          afterCare: treatment.afterCare,
          durationInMin: treatment.durationInMin,
          categories: treatment.category,
          companies: treatment.company
        });
      });
    });
  }

  save(): void {

    const treatment: Treatment = {
      id: this.treatmentForm.get('id')?.value ?? 0,
      title: this.treatmentForm.get('title')?.value ?? '',
      price: this.treatmentForm.get('price')?.value ?? 0,
      descriptionShort: this.treatmentForm.get('descriptionShort')?.value ?? '',
      descriptionLong: this.treatmentForm.get('descriptionLong')?.value ?? '',
      afterCare: this.treatmentForm.get('afterCare')?.value ?? '',
      durationInMin: this.treatmentForm.get('durationInMin')?.value ?? 0,
      category: this.treatmentForm.get('categories')?.value ?? [],
      company: this.treatmentForm.get('companies')?.value ?? '',
      images: []
    };

    if(this.isUpdate){
      const urlForUpdate = 'http://localhost:3000/treatments' + treatment.id;
      this.httpClient.put<Treatment>(urlForUpdate, treatment)
      .subscribe(data => this.router.navigate(['/treatments']));
    } else {
      const url = 'http://localhost:3000/treatments';
      this.httpClient.post<Treatment>(url, treatment)
      .subscribe(data => this.router.navigate(['/treatments']));
    }

  };

  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) {
      return o1.id === o2.id;
    } else {
      return o1 === o2;
    }
  }

}
