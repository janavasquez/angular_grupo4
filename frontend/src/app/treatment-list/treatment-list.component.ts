import { Treatment } from './../interfaces/treatment.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Booking } from '../interfaces/booking.model';
import { AuthenticationService } from '../authentication/services/authentication.service';

@Component({
  selector: 'app-treatment-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './treatment-list.component.html',
  styleUrl: './treatment-list.component.css'
})
export class TreatmentListComponent implements OnInit{

  treatments: Treatment[] = [];
  booking: Booking | undefined;
  isAdmin = false;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService) {
      this.authService.isAdmin.subscribe(isAdmin => this.isAdmin = isAdmin);
    }

  ngOnInit(): void {
    this.httpClient.get<Treatment[]>('http://localhost:3000/treatment')
    .subscribe(treatments => this.treatments = treatments);
  }

}
