import { Component } from '@angular/core';
import { UsersParentComponent } from '../User Pages/users-parent/users-parent.component';
import { BookingParentComponent } from '../Booking Pages/booking-parent/booking-parent.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [UsersParentComponent, BookingParentComponent],
})
export class HomeComponent {}
