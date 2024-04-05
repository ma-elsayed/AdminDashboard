import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingServiceService } from '../../../services/booking-service.service';
import { IBooking } from '../../../models/ibooking';

@Component({
  selector: 'app-booking-parent',
  standalone: true,
  templateUrl: './booking-parent.component.html',
  styleUrl: './booking-parent.component.scss',
  imports: [HeaderComponent, CommonModule, FormsModule],
})
export class BookingParentComponent implements OnInit, OnDestroy {
  bookings: IBooking[] | undefined;
  bookingsRequest: any;
  constructor(private BookingService: BookingServiceService) {}

  ngOnInit(): void {
    this.bookingsRequest = this.BookingService.getBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings.data;
      },
    });
  }
  ngOnDestroy(): void {
    this.bookingsRequest.unsubscribe();
  }
}
