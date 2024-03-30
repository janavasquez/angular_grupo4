import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Company } from '../interfaces/company.model';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink, DatePipe, RouterOutlet],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css'
})

export class CompanyListComponent implements OnInit {

  companies: Company[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get<Company[]>('http://localhost:3000/companies')
    .subscribe(companies => this.companies = companies);
  }


}
