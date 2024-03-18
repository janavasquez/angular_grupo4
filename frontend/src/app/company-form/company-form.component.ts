import { NgClass } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../interfaces/company.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.css'
})
export class CompanyFormComponent implements OnInit {


    // rellenar estos arrays en ngOnInit con datos del backend
    company : Company | undefined;

    companyForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', Validators.required),
      cif: new FormControl(),
      street: new FormControl(),
      city: new FormControl(),
      postalcode: new FormControl(),
      values: new FormControl(),
      treatment: new FormControl(),
      active: new FormControl(),
      photo: new FormControl(),
    });

    isUpdate: boolean = false;

    constructor(
      private httpClient: HttpClient,
      private activatedRoute: ActivatedRoute,
      private router: Router
      ) {}

    ngOnInit(): void {
      // recuperar los company del backend dinámicamente


      this.activatedRoute.params.subscribe(params => {
        let id = params['id'];
        this.httpClient.get<Company>(`http://localhost:3000/company/${id}`).subscribe(company => {
          this.company = company;
          this.isUpdate = true;

          this.companyForm.reset({
            id: company.id,
            name: company.name,
            cif: company.cif,
            street: company.street,
            city: company.city,
            postalcode: company.postalCode,
            values: company.values,
            treatment: company.treatments,
            active: company.active,
            photo: company.photo,

          });

        });
      });
    }

    save(): void {
      console.log('invocando save');

      const comp: Company = {
        id: this.companyForm.get('id')?.value ?? 0,
        name: this.companyForm.get('name')?.value ?? '',
        cif: '',
        street: '',
        city: '',
        postalCode: '',
        values: '',
        treatments: '',
        active: false,
        photo: ''
      };


      if(this.company){
        // ACTUALIZAR COMPANY  EXISTENTE
        const urlForUpdate = 'http://localhost:3000/company/' + this.company.id;
        this.httpClient.put<Company>(urlForUpdate, this.company).subscribe(data => this.router.navigate(['/']));
      } else {
        // CREAR NUEVA COMPANY
        const url = 'http://localhost:3000/company';
        this.httpClient.post<Company>(url, comp).subscribe(data => this.router.navigate(['/']));


      }

    }

    }



