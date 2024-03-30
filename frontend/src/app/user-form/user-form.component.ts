import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../interfaces/user.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule,RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit{
  

  users: User[] =[]; //PRALAN
  userForm = new FormGroup({
    id: new FormControl(),
    fullName: new FormControl,
    email: new FormControl(),
    phone: new FormControl(),
    active: new FormControl(),
    registerDate: new FormControl(new Date()),
    nif: new FormControl(),
    street: new FormControl(),
    city: new FormControl(),
    password: new FormControl(),// PRALAN
    postalCode: new FormControl(),
    photo: new FormControl(),
    
  });
  isUpdate: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {}
  ngOnInit(): void {
    const urlCom = 'http://localhost:3000/users';
    this.httpClient.get<User[]>(urlCom).subscribe(users => this.users = users)
  }


  save(): void{ //PRALAN
    console.log('invocando save');
    const user: User = {
      id: this.userForm.get('id')?.value ?? 0,
      fullName: this.userForm.get('fullName')?.value ?? '',
      email: this.userForm.get('email')?.value ?? '',
      phone: this.userForm.get('phone')?.value ?? '',
      active: this.userForm.get('active')?.value ?? false,
      registerDate: this.userForm.get('registerDate')?.value ?? new Date(),
      nif: this.userForm.get('nif')?.value ?? '',
      password: this.userForm.get('password')?.value ?? '',
      street: this.userForm.get('street')?.value ?? '',
      city: this.userForm.get('city')?.value ?? '',
      postalCode: this.userForm.get('postalCode')?.value ?? '',
      photo: this.userForm.get('photo')?.value ?? []

    };


    if(this.isUpdate){
      // ACTUALIZAR UN PRODUCTO EXISTENTE
      const urlForUpdate = 'http://localhost:3000/users/update' + user.id;
      this.httpClient.put<User>(urlForUpdate, user).subscribe(data => this.router.navigate(['/']));
    } else {
      // CREAR UN NUEVO PRODUCTO
      const url = 'http://localhost:3000/users/create';
      this.httpClient.post<User>(url, user).subscribe(data => this.router.navigate(['/']));
    }
    
  }
}
