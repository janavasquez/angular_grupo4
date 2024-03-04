import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../interfaces/user.model';

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

  constructor(private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.userService.findById(id).subscribe(user => this.user = user)

    });
  }

  deleteUser() {
    const remove = confirm("Quiere eliminar el usuario");
   // Si no se quiere borrar o no existe el autor
    if (!remove || !this.user) 
       return; // Si no se quiere borrar no continuamos.

       this.userService.deleteById(this.user.id).subscribe(() => {
        // navegar hacia user list
        this.router.navigate(['/users']);
       });
  }
}
