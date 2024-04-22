import { Treatment } from './../interfaces/treatment.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Booking } from '../interfaces/booking.model';

@Component({
  selector: 'app-treatment-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink],
  templateUrl: './treatment-list.component.html',
  styleUrl: './treatment-list.component.css'
})
export class TreatmentListComponent implements OnInit{

  treatments: Treatment[] = [];
  booking: Booking | undefined;

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get<Treatment[]>('http://localhost:3000/treatment')
    .subscribe(treatments => this.treatments = treatments);
  }

}
