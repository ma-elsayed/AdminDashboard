import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UsersService } from '../../services/users.service';
import { BookingServiceService } from '../../services/booking-service.service';
import { RoomService } from '../../services/room.service';
import { HotelService } from '../../services/hotel.service';
import { IUser } from '../../models/iuser';
import { IBooking } from '../../models/ibooking';
import { Hotel } from '../../models/hotel';
import { IRooms } from '../../models/room';
import { Subscription } from 'rxjs';
Chart.register(...registerables);
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  usersRequest: Subscription | undefined = undefined;
  users: IUser[] = [];
  usersNumber: number = 0;
  activeUsers: number = 0;
  bookingsRequest: Subscription | undefined = undefined;
  bookingsList: IBooking[] = [];
  bookingsNumber: number = 0;
  bookings: any;
  bookingByMonth: any;
  hotelsRequest: Subscription | undefined = undefined;
  hotels: Hotel[] = [];
  hotelsNumber: number = 0;
  roomsRequest: Subscription | undefined = undefined;
  rooms: IRooms[] = [];
  roomsNumber: number = 0;
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
  ngOnDestroy(): void {
    this.usersRequest;
    this.bookingsRequest;
  }
  ngAfterViewInit(): void {
    this.usersRequest = this.getUsers();
    this.bookingsRequest = this.getBookings();
    this.hotelsRequest = this.getHotels();

    this.roomsRequest = this.getRooms();
  }
  ngOnInit(): void {}

  getUsers() {
    return this.UserService.getUsers().subscribe({
      next: (users) => {
        this.users = users.data;
        this.usersNumber = this.users.length;
        this.filterUsers();
        this.usersChart();
      },
      error: (error) => {
        console.error(`error: ${error}`);
      },
    });
  }
  filterUsers(): void {
    this.activeUsers = this.users.filter((user) => user.active).length;
  }

  getBookings() {
    return this.BookingService.getBookings().subscribe({
      next: (bookings) => {
        this.bookingsList = bookings.data;
        this.bookingsNumber = this.bookingsList.length;
        this.bookings = bookings.data.filter(
          (booking) =>
            new Date(booking.checkIn).getFullYear() === new Date().getFullYear()
        );
        const bookingsByMonth: { [key: string]: IBooking[] } = {};
        this.bookings.forEach((booking: IBooking) => {
          const date = new Date(booking.checkIn);
          const month = date.toLocaleString('default', { month: 'long' });
          if (!bookingsByMonth[month]) {
            bookingsByMonth[month] = [];
          }
          bookingsByMonth[month].push(booking);
        });

        this.bookingByMonth = bookingsByMonth;
        this.bookingsChart();
      },
      error: (error) => {
        console.error(`error: ${error}`);
      },
    });
  }

  usersChart(): void {
    const ctx = document.getElementById('users') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Active', 'Inactive'],
        datasets: [
          {
            data: [this.activeUsers, this.users.length - this.activeUsers],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)', // Active users color
              'rgba(255, 99, 132, 0.2)', // Inactive users color
            ],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: this.options,
    });
  }

  bookingsChart(): void {
    const bookingsData: number[] = [];
    const months: string[] = Object.keys(this.bookingByMonth);

    months.forEach((month) => {
      bookingsData.push(this.bookingByMonth[month].length);
    });

    const ctx2 = document.getElementById('bookings') as HTMLCanvasElement;

    new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Bookings',
            data: bookingsData,
            backgroundColor: 'rgba(255, 206, 86, 0.8)', // Bookings color
            borderWidth: 1,
          },
        ],
      },
      options: this.options,
    });
  }

  getHotels() {
    return this.HotelService.getHotels().subscribe(
      (hotels) => {
        this.hotels = hotels.data;
        this.hotelsNumber = this.hotels.length;
        this.hotelsChart();
      },
      (error) => {
        console.error('Error loading hotels:', error);
      }
    );
  }

  hotelsChart(): void {
    const hotelCountByCity = new Map<string, number>();

    this.hotels.forEach((hotel) => {
      const city = hotel.hotelCity;
      hotelCountByCity.set(city, (hotelCountByCity.get(city) || 0) + 1);
    });

    const cityData = Array.from(hotelCountByCity.entries()).map(
      ([city, hotelCount]) => {
        return { city, hotelCount };
      }
    );

    const ctx3 = document.getElementById('hotels') as HTMLCanvasElement;

    new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: cityData.map((city) => city.city),
        datasets: [
          {
            label: `Total: ${this.hotels.length}`,
            data: cityData.map((city) => city.hotelCount),
            backgroundColor: 'rgba(153, 102, 255, 0.8)', // Hotels color
            borderWidth: 1,
          },
        ],
      },
      options: this.options,
    });
  }

  getRooms() {
    return this.RoomsService.getAllRooms().subscribe((res) => {
      this.rooms = res.data;
      this.roomsNumber = this.rooms.length;
      this.roomsChart();
    });
  }

  roomsChart() {
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

    const ctx3 = document.getElementById('rooms') as HTMLCanvasElement;

    new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: hotelData.map((hotel) => hotel.hotelName),
        datasets: [
          {
            label: 'Number of Rooms',
            data: hotelData.map((hotel) => hotel.roomCount),
            backgroundColor: 'rgba(255, 159, 64, 0.8)', // Rooms color
            borderWidth: 1,
          },
        ],
      },
      options: this.options,
    });
  }
}
