import { Routes } from '@angular/router';
import { TreatmentListComponent } from './treatment-list/treatment-list.component';
import { TreatmentDetailComponent } from './treatment-detail/treatment-detail.component';
import { HomeComponent } from './home/home.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { TreatmentFormComponent } from './treatment-form/treatment-form.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyFormComponent } from './company-form/company-form.component';

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
    path: 'companies/:id/delete',
    component: CompanyFormComponent
  },
  {
    path: 'category',
    component: CategoryListComponent
  },
  {
    path: 'category/:id',
    component: CategoryDetailComponent
  }
];
