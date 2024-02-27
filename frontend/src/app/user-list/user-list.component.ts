import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../interfaces/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, DatePipe, HttpClientModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadAuthors();
  }
  loadAuthors() {
    this.userService.findAll()
          .subscribe(users => this.users = users);
  }
  deleteAuthor(id: string | number) {
    // 1. mostrar un confirm que pregunte si quiere borrar
    const remove: boolean = confirm("¿Quiere borrar el autor de verdad?");

    if(!remove) return; // si el usuario no ha confirmado entonces no se borra

    this.userService.deleteById(id).subscribe(() => {
        this.loadAuthors(); // refresca la tabla para que desaparezca el autor borrado
    });
  }
}
