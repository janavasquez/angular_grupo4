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

  user: User | undefined;

  userForm = new FormGroup({
    id: new FormControl(),
    fullName: new FormControl(),
    phone: new FormControl(),
    birthDate: new FormControl(),
    nif: new FormControl(),
    street: new FormControl(),
    city: new FormControl(),
    postalCode: new FormControl(),
  });

  photoPreview: string | undefined;
  photoFile: File | undefined;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.httpClient.get<User>('http://localhost:3000/user/account').subscribe(user => {
      this.user = user;
      this.userForm.reset(user);
    });
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(!id)
        return;
      this.httpClient.get<User>(`http://localhost:3000/user/account/${id}`)
      .subscribe(user => {
        this.userForm.reset({
          id: user.id,
          fullName: user.fullName,
          phone: user.phone,
          birthDate: user.birthDate,
          nif: user.nif,
          street: user.street,
          city: user.city,
          postalCode: user.postalCode
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
    if(!this.user) return;

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

  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) {
      return o1.id === o2.id;
    } else {
      return o1 === o2;
    }
  }

}
