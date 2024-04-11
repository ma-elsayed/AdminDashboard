import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../models/iuser';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { IBooking } from '../../../models/ibooking';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  user: IUser | undefined;
  userId: any;
  bookingsPerUser: IBooking[] | undefined;
  userHasBookings: boolean = false;
  constructor(
    public activatedRoute: ActivatedRoute,
    private UserService: UsersService
  ) {}

  toggleUserActive(user: IUser) {
    this.UserService.updateUser(user._id, { active: !user.active }).subscribe({
      next: (res) => {
        if (user.active === true) {
          alert('User deactivated');
        } else {
          alert('User activated');
        }

        const { active, ...updatedUser } = res.data;
        this.user = { ...this.user, active, ...updatedUser };
      },
      error: (error) => {
        console.error('User update failed', error);
        alert('User update failed');
      },
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
    });
    this.UserService.getUser(this.userId).subscribe((user) => {
      this.user = user;
    });
    this.UserService.getBookingForUser(this.userId).subscribe((bookings) => {
      this.bookingsPerUser = bookings.data;
      if (bookings.data.length > 0) {
        this.userHasBookings = true;
      } else {
        this.userHasBookings = false;
      }
    });
  }
}
