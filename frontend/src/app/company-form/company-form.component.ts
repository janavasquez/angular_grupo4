import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../interfaces/company.model';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [NgClass],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.css'
})
export class CompanyformComponent {

  company: Company | undefined;


  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.http.get<Company>(`http://localhost:3000/books/${id}`).subscribe(company => this.company = company);
    });
  }

}
