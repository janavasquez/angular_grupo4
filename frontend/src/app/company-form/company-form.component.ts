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
    companies : Company[] = [];

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
      const urlMan = 'http://localhost:3000/companies';
      this.httpClient.get<Company[]>(urlMan)
                    .subscribe(companies => this.companies = companies);

      this.activatedRoute.params.subscribe(params => {
        let id = params['id'];
        this.httpClient.get<Company>(`http://localhost:3000/companies/${id}`).subscribe(companies => {

          this.isUpdate = true;
          
          this.companyForm.reset({
            id: companies.id,
            name: companies.name,
            cif: companies.cif,
            street: companies.street,
            city: companies.city,
            postalcode: companies.postalCode,
            values: companies.values,
            treatment: companies.treatments,
            active: companies.active,
            photo: companies.photo,

          });

        });
      });
    }

    save(): void {
      console.log('invocando save');


      if(this.isUpdate){
        // ACTUALIZAR COMPANY  EXISTENTE
        const urlForUpdate = 'http://localhost:3000/companies/' + companies.id;
        this.httpClient.put<Company>(urlForUpdate, companies).subscribe(data => this.router.navigate(['/']));
      } else {
        // CREAR NUEVA COMPANY
        const url = 'http://localhost:3000/companies';
        this.httpClient.post<Company>(url, companies).subscribe(data => this.router.navigate(['/']));


      }

    }

    }



