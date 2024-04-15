import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Register } from '../interfaces/register.model';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {

  registerForm = this.fb.group({
    nickname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    surname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    password: ['', [Validators.required]],
    passwordConfirm: ['', [Validators.required]]
  },
  {validators: this.passwordConfirmValidator} 
  );

  constructor(private fb: FormBuilder,
    private httpClient: HttpClient) {}

  passwordConfirmValidator(control: AbstractControl){
    if(control.get('password')?.value === control.get('passwordConfirm')?.value){
      return null; 
    } else {
      return {
        'confirmError': true 
      }
    }
  }

  save(){

    let register: Register = {
      nickname: this.registerForm.get('nickname')?.value ?? '',
      name: this.registerForm.get('nickname')?.value ?? '',
      surname: this.registerForm.get('nickname')?.value ?? '',
      email: this.registerForm.get('email')?.value ?? '',
      phone: this.registerForm.get('phone')?.value ?? '',
      password: this.registerForm.get('password')?.value ?? '',
    };

    let url = 'http://localhost:3000/user/register';
    this.httpClient.post<Register>(url, register)
                    .subscribe(res => {
                      console.log(res);
                    });


  }
}