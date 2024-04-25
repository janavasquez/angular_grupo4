import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

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

  

}
