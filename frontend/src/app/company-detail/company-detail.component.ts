import { NgClass } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../interfaces/company.model';

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [NgClass, HttpClientModule],
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.css'
})
export class CompanyDetailComponent {

  company: Company | undefined;

  // constructor con httpClient
  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.http.get<Company>(`http://localhost:3000/company/${id}`).subscribe(company => this.company = company);
    });
  }

  deleteCompany() {

  }

}
