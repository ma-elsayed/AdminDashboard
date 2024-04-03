import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UsersService } from '../../services/users.service';
import { BookingServiceService } from '../../services/booking-service.service';
import { RoomService } from '../../services/room.service';
import { HotelService } from '../../services/hotel.service';
import { IUser } from '../../models/iuser';
import { IBooking } from '../../models/ibooking';
import { Hotel } from '../../models/hotel';
import { IRooms } from '../../models/room';
Chart.register(...registerables);
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [],
})
export class HomeComponent implements OnInit {
  users: IUser[] = [];
  usersNumber: number = 0;
  activeUsers: IUser[] = [];
  inactiveUsers: IUser[] = [];
  bookings: IBooking[] = [];
  bookingsNumber: number = 0;
  bookingsByMonth: any;
  rooms: IRooms[] = [];
  hotels: Hotel[] = [];
  hotelsNumber: number = 0;
  options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 4 / 3,
  };
  constructor(
    private UserService: UsersService,
    private BookingService: BookingServiceService,
    private RoomsService: RoomService,
    private HotelService: HotelService
  ) {}
  ngOnInit(): void {
    this.getUsers();
    this.getBookings();
    this.getHotels();
    this.getRooms();
  }

  getUsers(): IUser[] {
    this.UserService.getUsers().subscribe((res) => {
      this.users = res.data;
      this.usersNumber = this.users.length;
      this.filterUsers();
      this.usersChart();
    });
    return this.users;
  }
  filterUsers(): void {
    this.activeUsers = this.users.filter((user) => user.active);
    this.inactiveUsers = this.users.filter((user) => !user.active);
  }
  usersChart() {
    const activeUsersCount = this.users.filter((user) => user.active).length;
    const inactiveUsersCount = this.users.filter((user) => !user.active).length;
    const ctx = document.getElementById('users') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Active', 'Inactive'],
        datasets: [
          {
            label: 'Users',
            data: [activeUsersCount, inactiveUsersCount],
            hoverOffset: 4,
          },
        ],
      },
      options: this.options,
    });
  }

  getBookings(): void {
    const currentYear = new Date().getFullYear();
    this.BookingService.getBookings().subscribe((res) => {
      this.bookings = res.data.filter(
        (booking) => new Date(booking.checkIn).getFullYear() === currentYear
      );
      this.bookingsNumber = this.bookings.length;

      const bookingsByMonth: { [key: string]: IBooking[] } = {};

      this.bookings.forEach((booking) => {
        const date = new Date(booking.checkIn);
        const month = date.toLocaleString('default', { month: 'long' });
        if (!bookingsByMonth[month]) {
          bookingsByMonth[month] = [];
        }
        bookingsByMonth[month].push(booking);
      });

      this.bookingsByMonth = bookingsByMonth;
      this.bookingsChart();
    });
  }

  bookingsChart(): void {
    const bookingsData: number[] = [];
    const months: string[] = Object.keys(this.bookingsByMonth);

    months.forEach((month) => {
      bookingsData.push(this.bookingsByMonth[month].length);
    });

    const ctx2 = document.getElementById('bookings') as HTMLCanvasElement;

    new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'bookings',
            data: bookingsData,
            backgroundColor: ['rgba(54, 162, 235, .8)'],
            borderWidth: 1,
          },
        ],
      },
      options: this.options,
    });
  }

  getHotels() {
    this.HotelService.getHotels().subscribe(
      (data) => {
        this.hotels = data.data;
        this.hotelsNumber = this.hotels.length;
        this.hotelsChart();
      },
      (error) => {
        console.error('Error loading hotels:', error);
      }
    );
  }
  hotelsChart(): void {
    const roomCountByHotel = new Map<string, number>();
    this.rooms.forEach((room) => {
      const hotelName = room.hotelId.hotelName;
      const currentCount = roomCountByHotel.get(hotelName) || 0;
      roomCountByHotel.set(hotelName, currentCount + 1);
    });

    const hotelData = Array.from(roomCountByHotel.entries()).map(
      ([hotelName, roomCount]) => {
        return { hotelName, roomCount };
      }
    );

    const ctx3 = document.getElementById('hotels') as HTMLCanvasElement;

    new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: hotelData.map((hotel) => hotel.hotelName),
        datasets: [
          {
            label: 'Number of Rooms',
            data: hotelData.map((hotel) => hotel.roomCount),
            backgroundColor: ['rgba(54, 162, 235, .8)'],
            borderWidth: 1,
          },
        ],
      },
      options: this.options,
    });
  }

  getRooms(): void {
    this.RoomsService.getAllRoomsNoId().subscribe((res) => {
      this.rooms = res.data;
    });
  }

  RenderChart() {
    const ctx4 = document.getElementById('rooms') as HTMLCanvasElement;

    new Chart(ctx4, {
      type: 'pie',
      data: {
        labels: ['active', 'unactive'],
        datasets: [
          {
            label: 'rooms',
            data: [300, 100],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
    });
  }
}
