import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../interfaces/login.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

constructor(private fb: FormBuilder,
            private httpClient: HttpClient,
            private router: Router ){}

save() {

  let login: Login = {
    email: this.loginForm.get('email')?.value ?? '',
    password: this.loginForm.get('password')?.value ?? ''
  }

  let url ='http://localhost:3000/user/login';
  this.httpClient.post<Login>(url, login).subscribe(res => {console.log(res);
  this.router.navigate(['/']);
  
  });


}
}
