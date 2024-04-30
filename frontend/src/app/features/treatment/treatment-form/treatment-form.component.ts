import { Treatment } from '../../../interfaces/treatment.model';
import { Component, OnInit } from '@angular/core';
import { Company } from '../../../interfaces/company.model';
import { Category } from '../../../interfaces/category.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-treatment-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgbDatepickerModule, RouterLink],
  templateUrl: './treatment-form.component.html',
  styleUrl: './treatment-form.component.css'
})
export class TreatmentFormComponent implements OnInit{

  companies: Company [] = [];
  categories: Category [] = [];

  treatmentForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.min(0), Validators.max(500)]),
    descriptionShort: new FormControl(),
    descriptionLong: new FormControl(),
    afterCare: new FormControl(),
    durationInMin: new FormControl(),
    company: new FormControl(),
    categories: new FormControl(),
    image: new FormControl()
  });

  isUpdate: boolean = false;
  photoPreview: string | undefined;
  photoFile: File | undefined;
  treatment: Treatment | undefined;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    if(this.router.url.includes('update')) {
      this.isUpdate = true;
    }

    const urlCom = 'http://localhost:3000/company';
    this.httpClient.get<Company[]>(urlCom)
    .subscribe(companies => this.companies = companies);

    const urlCat = 'http://localhost:3000/category';
    this.httpClient.get<Category[]>(urlCat)
    .subscribe(categories => this.categories = categories);

    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(!id)
        return; // si no existe id entonces no traemos treatment del backend


        // si sí existe id entonces es una actualización y por tanto traemos los datos del backend para actualizarlos
      this.httpClient.get<Treatment>(`http://localhost:3000/treatment/${id}`)
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
          categories: treatment.categories,
          company: treatment.company,
          image: treatment.image
        });
      });
    });
  }

  onFileChange(event: Event) {
    let target = event.target as HTMLInputElement;
    if (target.files !== null && target.files.length > 0) {
      this.photoFile = target.files[0];
      let reader = new FileReader();
      reader.onload = event => this.photoPreview = reader.result as string;
      reader.readAsDataURL(this.photoFile);
    }
  }

  save() {

    /*const formData: Treatment = {
      id: this.treatmentForm.get('id')?.value ?? 0,
      title: this.treatmentForm.get('title')?.value ?? '',
      price: this.treatmentForm.get('price')?.value ?? 0,
      descriptionShort: this.treatmentForm.get('descriptionShort')?.value ?? '',
      image: this.treatmentForm.get('image')?.value ?? '',
      descriptionLong: this.treatmentForm.get('descriptionLong')?.value ?? '',
      afterCare: this.treatmentForm.get('afterCare')?.value ?? '',
      durationInMin: this.treatmentForm.get('durationInMin')?.value ?? 0
    };*/

    let formData = new FormData();
    formData.append('id', this.treatmentForm.get('id')?.value ?? 0);
    formData.append('title', this.treatmentForm.get('title')?.value ?? '');
    formData.append('price', this.treatmentForm.get('price')?.value + '');
    formData.append('descriptionShort', this.treatmentForm.get('descriptionShort')?.value ?? '');
    formData.append('descriptionLong', this.treatmentForm.get('descriptionLong')?.value ?? '');
    formData.append('afterCare', this.treatmentForm.get('afterCare')?.value ?? '');
    formData.append('durationInMin', this.treatmentForm.get('durationInMin')?.value ?? 10);
    // formData.append('categories', this.treatmentForm.get('categories')?.value);
    // formData.append('company', this.treatmentForm.get('company')?.value);
    formData.append('image', this.treatmentForm.get('image')?.value ?? '');

    if(this.photoFile) formData.append('file', this.photoFile);

    if(this.isUpdate) {
      const id = this.treatmentForm.get('id')?.value;
      this.httpClient.put<Treatment>('http://localhost:3000/treatment/' + id, formData)
      .subscribe(treatment => {
        this.photoFile = undefined;
        this.photoPreview = undefined;
        this.treatment = treatment;
      });
    } else {
      this.httpClient.post<Treatment>('http://localhost:3000/treatment', formData)
      .subscribe(treatment => {
        this.photoFile = undefined;
        this.photoPreview = undefined;
        this.treatment = treatment;
      });
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
