import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  backendUrl: string = "http://localhost:3000/users";

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.backendUrl);
  }

  findById(id: number | string): Observable<User> {
    return this.httpClient.get<User>(`${this.backendUrl}/${id}`);
  }

  create(user: User): Observable<User> {
    return this.httpClient.post<User>(this.backendUrl, user);
  }

  update(id: number | string, usuario: User): Observable<User> {
    return this.httpClient.put<User>(`${this.backendUrl}/${id}`, usuario)
  }

  deleteById(id: number | string) {
    return this.httpClient.delete(`${this.backendUrl}/${id}`);
  }

}

