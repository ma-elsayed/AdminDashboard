import { Routes } from '@angular/router';
import { UsersParentComponent } from './components/User Pages/users-parent/users-parent.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { BookingParentComponent } from './components/Booking Pages/booking-parent/booking-parent.component';
import { UserDetailsComponent } from './components/User Pages/user-details/user-details.component';
import { adminAuthGuard } from './guards/admin-auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [adminAuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'hotels', component: HotelsComponent },
      { path: 'rooms', component: RoomsComponent },
      {
        path: 'users',
        component: UsersParentComponent,
      },
      { path: 'user/:id', component: UserDetailsComponent },
      {
        path: 'bookings',
        component: BookingParentComponent,
      },
    ],
  },
];
