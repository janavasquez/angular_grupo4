import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../interfaces/user.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [HttpClientModule],
  providers: [UserService],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {

  user: User | undefined;
  //users: User[] = [];
  //showDeletedMessage: boolean = false;

  constructor(private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (!id) {
        return;
      }
      this.httpClient.get<User>(`http://localhost:3000/user/${id}`)
        .subscribe(user => this.user = user);
      });
    }

    /*loadUsers() {
      this.httpClient.get<User[]>('http://localhost:3000/user')
      .subscribe(booksFromBackend => this.users = booksFromBackend);
    }
    */

    deleteUser(user: User) {
      const remove = confirm("Quiere eliminar el usuario");
     // Si no se quiere borrar o no existe el usuario
      if (!remove || !this.user)
         return; // Si no se quiere borrar no continuamos.
      this.httpClient.delete('http://localhost:3000/user/' + user.id)
      .subscribe(response => {
        //this.showDeletedMessage = true;
        //this.loadUsers();
        this.router.navigate(['/users']);
      });

  }
}
