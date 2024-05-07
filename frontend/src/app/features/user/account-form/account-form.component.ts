import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../interfaces/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgbAlert, RouterLink],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.css'
})
export class AccountFormComponent implements OnInit {

  userForm = new FormGroup({
    id: new FormControl(),
    fullName: new FormControl(),
    phone: new FormControl(),
    birthDate: new FormControl(),
    nif: new FormControl(),
    street: new FormControl(),
    city: new FormControl(),
    postalCode: new FormControl(),
    photoUrl: new FormControl(),
  });

  photoPreview: string | undefined;
  photoFile: File | undefined;
  user: User | undefined;
  isUpdate: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(!id) {
        return;
      }

      this.httpClient.get<User>(`http://localhost:3000/user/account/${id}`)
      .subscribe(user => {
        this.isUpdate = true;
        this.user = user;
        this.userForm.reset(user);
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

  save(): void {
/*if(!this.user) return;
    this.user.fullName = this.userForm.get('fullName')?.value;
    this.user.phone = this.userForm.get('phone')?.value;
    this.user.birthDate = this.userForm.get('birthDate')?.value;
    this.user.nif = this.userForm.get('nif')?.value;
    this.user.street = this.userForm.get('street')?.value;
    this.user.city = this.userForm.get('city')?.value;
    this.user.postalCode = this.userForm.get('postalCode')?.value;
    this.httpClient.put('http://localhost:3000/user', this.user).subscribe(data => {
      this.photoFile = undefined;
      this.photoPreview = undefined;
    });
  }

  */

  let formData = new FormData();

  formData.append('id', this.userForm.get('id')?.value ?? 0);
  formData.append('fullName', this.userForm.get('fullName')?.value ?? '');
  formData.append('phone', this.userForm.get('phone')?.value ?? '');
  formData.append('birthDate', this.userForm.get('birthDate')?.value ?? '');
  formData.append('nif', this.userForm.get('nif')?.value ?? '');
  formData.append('street', this.userForm.get('street')?.value ?? '');
  formData.append('city', this.userForm.get('city')?.value ?? '');
  formData.append('postalCode', this.userForm.get('postalCode')?.value ?? '');
  formData.append('photoUrl', this.userForm.get('photoUrl')?.value ?? '');

  if(this.photoFile) formData.append('file', this.photoFile);

  if(this.isUpdate) {
    const id = this.userForm.get('id')?.value;
    this.httpClient.put<User>('http://localhost:3000/user/account' + id, formData)
        .subscribe(user => {
          this.photoFile = undefined;
          this.photoPreview = undefined;
          this.user = user;
        });
  } else {
    this.httpClient.post<User>('http://localhost:3000/user/account', formData)
      .subscribe(user => {
        this.photoFile = undefined;
        this.photoPreview = undefined;
        this.user = user;
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
