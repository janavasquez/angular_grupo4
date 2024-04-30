import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Company } from '../../../interfaces/company.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../interfaces/category.model';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule, RouterLink],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.css'
})
export class CompanyFormComponent implements OnInit {

    companyForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', Validators.required),
      cif: new FormControl(),
      street: new FormControl(),
      city: new FormControl(),
      postalCode: new FormControl(),
      values: new FormControl(),
      //treatment: new FormControl(),
      //active: new FormControl(),
      photoUrl: new FormControl(),
    });

    photoFile: File | undefined;
    photoPreview: string | undefined;
    isUpdate: boolean = false;
    company: Company| undefined;
    category: Category| undefined;

     constructor(
      private httpClient: HttpClient,
      private activatedRoute: ActivatedRoute,

      ) {}

    ngOnInit(): void {
      // recuperar los company del backend dinámicamente


      this.activatedRoute.params.subscribe(params => {
        const id = params['id'];
    if(!id) {
      return;
    }
          this.httpClient.get<Company>(`http://localhost:3000/company/${id}`).subscribe(company => {
          this.company = company;
          this.isUpdate = true;

          this.companyForm.reset({
            id: company.id,
            name: company.name,
            cif: company.cif,
            street: company.street,
            city: company.city,
            postalCode: company.postalCode,
            values: company.values,
            //treatment: company.treatments,
            //active: company.active,
            photoUrl: company.photoUrl,

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

    let formData = new FormData();
    formData.append('id', this.companyForm.get('id')?.value ?? 0);
    formData.append('name', this.companyForm.get('name')?.value ?? '');
    formData.append('photoUrl', this.companyForm.get('photoUrl')?.value ?? '');
    formData.append('cif', this.companyForm.get('cif')?.value ?? '');
    formData.append('street', this.companyForm.get('street')?.value ?? '');
    formData.append('city', this.companyForm.get('city')?.value ?? '');
    formData.append('postalCode', this.companyForm.get('postalCode')?.value ?? 0);
    formData.append('values', this.companyForm.get('values')?.value ?? 0)
    //formData.append('treatment', this.companyForm.get('treatment')?.value ?? '');
    //formData.append('active', this.companyForm.get('active')?.value ?? '');




    if(this.photoFile) formData.append('file', this.photoFile);

    if(this.isUpdate) {
      const id =  this.companyForm.get('id')?.value;
      this.httpClient.put<Company>('http://localhost:3000/company/' + id, formData)
        .subscribe(company => {
          this.photoFile = undefined;
          this.photoPreview = undefined;
          this.company = company;
        });

    } else {
      this.httpClient.post<Company>('http://localhost:3000/company', formData)
        .subscribe(company => {
          this.photoFile = undefined;
          this.photoPreview = undefined;
          this.company = company;
        });

  }

}

}

