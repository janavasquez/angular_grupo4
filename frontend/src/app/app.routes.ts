import { Routes } from '@angular/router';
import { TreatmentListComponent } from './features/treatment/treatment-list/treatment-list.component';
import { TreatmentDetailComponent } from './features/treatment/treatment-detail/treatment-detail.component';
import { HomeComponent } from './layout/home/home.component';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { TreatmentFormComponent } from './features/treatment/treatment-form/treatment-form.component';
import { CompanyListComponent } from './features/company/company-list/company-list.component';
import { CompanyDetailComponent } from './features/company/company-detail/company-detail.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { UserDetailComponent } from './features/user/user-detail/user-detail.component';
import { UserLoginComponent } from './authentication/user-login/user-login.component';
import { UserRegisterComponent } from './authentication/user-register/user-register.component';
import { CompanyFormComponent } from './features/company/company-form/company-form.component';
import { BookingListComponent } from './features/booking/booking-list/booking-list.component';
import { BookingDetailComponent } from './features/booking/booking-detail/booking-detail.component';
import { BookingFormComponent } from './features/booking/booking-form/booking-form.component';
import { UserFormComponent } from './features/user/user-form/user-form.component';
import { CategoryFormComponent } from './features/category/category-form/category-form.component';
import { roleAdminGuard } from './authentication/guards/role.guard';
import { AccountFormComponent } from './features/user/account-form/account-form.component';
import { AvatarFormComponent } from './features/user/avatar-form/avatar-form.component';
import { CategoryDetailComponent } from './features/category/category-detail/category-detail.component';

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
