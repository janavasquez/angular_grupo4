import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgbDropdownModule, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  collapsed = true;
  isLoggedIn = false;
  userEmail: string | undefined;
  isAdmin = false;
  activeLink: string = '';
  setActive(link: string): void {
    this.activeLink = link;
  }



  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    this.authService.userEmail.subscribe(userEmail => this.userEmail = userEmail);
    this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
