import { Routes } from '@angular/router';
import { TreatmentListComponent } from './treatment-list/treatment-list.component';
import { TreatmentDetailComponent } from './treatment-detail/treatment-detail.component';
import { HomeComponent } from './home/home.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { TreatmentFormComponent } from './treatment-form/treatment-form.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';

import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { BookingFormComponent } from './booking-form/booking-form.component';

export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },
  // Rutas componente treatments
  // Listado de tratamientos
  {
    path: 'treatments',
    component: TreatmentListComponent
  },
  // La pantalla de detalle de un solo tratamiento
  {
    path: 'treatments/:id/detail',
    component: TreatmentDetailComponent
  },
  // La pantalla creación de un tratamiento
  {
    path: 'treatments/create',
    component: TreatmentFormComponent
  },
  // La  pantalla de modificación de un tratamiento
  {
    path: 'treatments/:id/update',
    component: TreatmentFormComponent
  },
  // La pantalla de borrar un tratamiento
  {
    path: 'treatments/:id/delete',
    component: TreatmentFormComponent
  },
  // Rutas componente company
  {
    path: 'companies',
    component: CompanyListComponent
  },
  {
    path: 'companies/:id/detail',
    component: CompanyDetailComponent
  },
  {
    path: 'companies/create',
    component: CompanyFormComponent
  },
  {
    path: 'companies/:id/update',
    component: CompanyFormComponent
  },
  {
    path: 'categories',
    component: CategoryListComponent
  },
  {
    path: 'categories/:id/detail',
    component: CategoryDetailComponent
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'users/:id',
    component: UserDetailComponent
  },
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: 'register',
    component: UserRegisterComponent
  },
  {
    path: 'booking',
    component: BookingListComponent
  },
  {
    path: 'booking/:id/detail',
    component: BookingDetailComponent
  },
  {
    path: 'booking/:id/create',
    component: BookingFormComponent
  },
  {
    path: 'booking/:id/update',
    component: BookingFormComponent
  },
  {
    path: 'booking/:id/delete',
    component: BookingFormComponent
  }
];
