import { DatePipe, NgFor, NgStyle } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../interfaces/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [HttpClientModule,RouterLink, NgFor,DatePipe,NgStyle],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
users: User[] = [];

constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get<User[]>('http://localhost:3000/user')
    .subscribe(user => this.users = user);
  }
}
