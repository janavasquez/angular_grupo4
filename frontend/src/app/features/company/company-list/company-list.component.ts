import { DatePipe, NgStyle } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Company } from '../../../interfaces/company.model';
import { AuthenticationService } from '../../../authentication/services/authentication.service';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink, DatePipe, RouterOutlet, NgStyle],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css'
})

export class CompanyListComponent implements OnInit {

  companies: Company[] = [];
  isAdmin = false;

  constructor(
    private httpClient: HttpClient,
    private activetedRoute: ActivatedRoute,
    private authService: AuthenticationService ) {
      this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
    }


  ngOnInit(): void {
    this.httpClient.get<Company[]>('http://localhost:3000/company')
    .subscribe(companies => this.companies = companies);
  }


}
