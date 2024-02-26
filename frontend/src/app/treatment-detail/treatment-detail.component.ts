import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Treatment } from './../interfaces/treatment.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-treatment-detail',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './treatment-detail.component.html',
  styleUrl: './treatment-detail.component.css'
})
export class TreatmentDetailComponent implements OnInit{

  treatment: Treatment | undefined;

  constructor(private http:HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.http.get<Treatment>(`http://localhost:3000/treatments/${id}`)
        .subscribe(treatment => this.treatment = treatment);
    });
  }



}


