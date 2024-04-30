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
import { UserLoginComponent } from './authentication/user-login/user-login.component';
import { UserRegisterComponent } from './authentication/user-register/user-register.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { roleAdminGuard } from './authentication/guards/role.guard';
import { AccountFormComponent } from './account-form/account-form.component';
import { AvatarFormComponent } from './avatar-form/avatar-form.component';

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
    component: TreatmentFormComponent,
    canActivate: [roleAdminGuard]
  },
  // La  pantalla de modificación de un tratamiento
  {
    path: 'treatments/:id/update',
    component: TreatmentFormComponent,
    canActivate: [roleAdminGuard]
  },
  // La pantalla de borrar un tratamiento
  {
    path: 'treatments/:id/delete',
    component: TreatmentFormComponent,
    canActivate: [roleAdminGuard]
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
  // rutas componentes categories
  {
    path: 'categories',
    component: CategoryListComponent
  },
  {
    path: 'categories/:id/detail',
    component: CategoryDetailComponent
  },
  {
    path: 'categories/create',
    component:CategoryFormComponent

  },

  {
    path:'categories/:id/update',
    component:CategoryFormComponent
  },
    {
    path:'categories/:id/delete',
    component:CategoryFormComponent
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
    path: 'booking/create',
    component: BookingFormComponent
  },
  {
    path: 'booking/:id/update',
    component: BookingFormComponent
  },
  {
    path: 'booking/:id/delete',
    component: BookingFormComponent
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'users/create',
    component: UserFormComponent
  },
  {
    path: 'users/:id/detail',
    component: UserDetailComponent
  },
  {
    path: 'users/:id/update',
    component: UserFormComponent
  },
  {
    path: 'users/:id/delete',
    component: UserFormComponent
  },
  {
    path: 'account',
    component: AccountFormComponent
  },
  {
    path: 'account/avatar',
    component: AvatarFormComponent
  }
];
