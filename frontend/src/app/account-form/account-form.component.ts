import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../interfaces/user.model';
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
    fullName: new FormControl(),
    phone: new FormControl(),
    birthDate: new FormControl(),
    nif: new FormControl(),
    street: new FormControl(),
    city: new FormControl(),
    postalCode: new FormControl(),
  });

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get<User>('http://localhost:3000/user/account').subscribe(user => {
      this.user = user;
      this.userForm.reset(user);
    });
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
  
    });

  }

}
