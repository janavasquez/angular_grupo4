import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../interfaces/user.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {


  users: User[] = [];
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
    postalCode: new FormControl(),
    photo: new FormControl(),

  });

  photoFile: File | undefined;
  photoPreview: string | undefined;
  isUpdate: boolean = false;
  user: User | undefined;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

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
    /*const user: User = {
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
      photoUrl: this.userForm.get('photo')?.value ?? []
    };
    */

    let formData = new FormData();

    if (this.photoFile)
      formData.append('file', this.photoFile);

    formData.append('id', this.userForm.get('id')?.value ?? 0);
    formData.append('firstName', this.userForm.get('fullName')?.value ?? '');
    formData.append('email', this.userForm.get('email')?.value ?? '');
    formData.append('phone', this.userForm.get('phone')?.value ?? '');
    formData.append('active', this.userForm.get('active')?.value ?? false);
    //formData.append('registerDate', this.userForm.get('registerDate')?.value ?? new Date());
    formData.append('nif', this.userForm.get('nif')?.value ?? '');
    formData.append('street', this.userForm.get('street')?.value ?? '');
    formData.append('city', this.userForm.get('city')?.value ?? '');
    formData.append('postalCode', this.userForm.get('postalCode')?.value ?? '');

    this.httpClient.post('http://localhost:3000/user', formData)
      .subscribe(user => {
        this.photoFile = undefined;
        this.photoPreview = undefined;
        console.log(user);

      })



  }
}
