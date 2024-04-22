import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user.model';
import { Treatment } from '../interfaces/treatment.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from '../interfaces/booking.model';
import { Company } from '../interfaces/company.model';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, NgbDatepickerModule, RouterLink],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit {

  user: User[] = [];
  treatments: Treatment[] = [];
  companies: Company [] = [];
  price = 0;

  bookingForm = new FormGroup({
    id: new FormControl(),
    user: new FormControl(),
    startDate: new FormControl(new Date()),
    treatment: new FormControl(),
    discount: new FormControl(),
    price: new FormControl(),
    company: new FormControl()
  });

  booking: Booking | undefined;
  isUpdate: boolean = false;
  showConfirmMessage = false;

  constructor(private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {

    if(this.router.url.includes('update')) {
      this.isUpdate = true;
    }

    const urlUser = 'http://localhost:3000/user';
    this.httpClient.get<User[]>(urlUser)
    .subscribe(user => this.user = user);

    const urlTrea = 'http://localhost:3000/treatment';
    this.httpClient.get<Treatment[]>(urlTrea)
    .subscribe(treatment => this.treatments = treatment);

    const urlComp = 'http://localhost:3000/company';
    this.httpClient.get<Company[]>(urlComp)
    .subscribe(companies => this.companies = companies);

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(!id) return;
      this.httpClient.get<Booking>("http://localhost:3000/booking/" + id)
      .subscribe(booking => this.booking = booking)
    });
  }

  save(): void {

    const booking: Booking = {
      id: this.bookingForm.get('id')?.value ?? 0,
      startDate: this.bookingForm.get('startdate')?.value ?? new Date,
      treatment: this.bookingForm.get('treatment')?.value ?? '',
      discount: this.bookingForm.get('discount')?.value ?? 0,
      price: this.bookingForm.get('price')?.value ?? 0,
      company: this.bookingForm.get('company')?.value
    };

    if(this.isUpdate){
      const urlForUpdate = 'http://localhost:3000/booking' + booking.id;
      this.httpClient.put<Booking>(urlForUpdate, booking)
      .subscribe(data => this.router.navigate(['/booking']));
    } else {
      const url = 'http://localhost:3000/booking';
      this.httpClient.post<Booking>(url, booking)
      .subscribe(data => this.router.navigate(['/booking']));
    }
  };

  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) {
      return o1.id === o2.id;
    } else {
      return o1 === o2;
    }
  }

}
