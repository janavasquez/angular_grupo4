import { NgClass } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../../../interfaces/company.model';

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
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.http.get<Company>(`http://localhost:3000/company/${id}`).subscribe(company => this.company = company);
    });
  }

  deleteCompany(company: Company) {
    const remove = confirm("Quiere eliminar el centro");
    // Si no se quiere borrar o no existe el usuario
     if (!remove || !this.company)
        return; // Si no se quiere borrar no continuamos.
     this.http.delete('http://localhost:3000/company/' + company.id)
     .subscribe(response => {
       //this.showDeletedMessage = true;
       //this.loadUsers();
       this.router.navigate(['/companies']);
     });
  }

}
