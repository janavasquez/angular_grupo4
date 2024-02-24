import { DatePipe } from '@angular/common';
import { Treatment } from './../interfaces/treatment.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-treatment-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink, DatePipe],
  templateUrl: './treatment-list.component.html',
  styleUrl: './treatment-list.component.css'
})
export class TreatmentListComponent implements OnInit{

  treatments: Treatment[] = [];

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get<Treatment[]>('http://localhost:3000/treatments')
    .subscribe(treatments => this.treatments = treatments);
  }

}
