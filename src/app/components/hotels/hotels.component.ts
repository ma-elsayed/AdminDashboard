import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Hotel } from '../../models/hotel';
import { HotelService } from '../../services/hotel.service';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.scss',
})
export class HotelsComponent implements OnInit {
  @ViewChild('myModal') model!: ElementRef;
  hotelObj: Hotel = new Hotel();
  hotelList: Hotel[] = [] as Hotel[];
  requestedHotelsList: Hotel[] = [] as Hotel[];
  showingList: Hotel[] = [];
  state: boolean = true;

  constructor(private hotelService: HotelService, public router: Router) {}

  ngOnInit() {
    this.loadHotels();
  }

  loadHotels() {
    this.hotelService.getHotels().subscribe(
      (data) => {
        console.log(data);
        this.hotelList = data.data.filter((hotel) => hotel.approved === true);
        this.requestedHotelsList = data.data.filter(
          (hotel) => hotel.approved === false
        );
        this.showingList = this.hotelList;
      },
      (error) => {
        console.log('Error loading hotels:', error);
      }
    );
  }

  openModel() {
    // this.model.nativeElement.style.display = 'block';
    const model = document.getElementById('myModal');
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeModel() {
    this.hotelObj = new Hotel();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  goToRooms(rooms: Hotel) {
    console.log(rooms);
    this.router.navigate(['rooms/' + rooms._id]);
  }

  onDelete(item: Hotel) {
    const isDelete = confirm('Are you sure you want to Delete?');
    if (isDelete) {
      this.hotelService.deleteHotel(item._id).subscribe(
        () => {
          this.hotelList = this.hotelList.filter(
            (hotel) => hotel._id == item._id
          );
          this.requestedHotelsList = this.requestedHotelsList.filter(
            (hotel) => hotel._id == item._id
          );
        },
        (error) => {
          console.error('Error deleting hotel:', error);
        }
      );
    }
  }

  onEdit(item: Hotel) {
    this.hotelObj = item;
    console.log(this.hotelObj);
    this.openModel();
  }

  updateHotel() {
    this.hotelService.updateHotel(this.hotelObj).subscribe(
      () => {
        const index = this.hotelList.findIndex(
          (m) => m._id === this.hotelObj._id
        );
        if (index !== -1) {
          this.hotelList[index] = this.hotelObj;
          this.requestedHotelsList[index] = this.hotelObj;
        }
        this.loadHotels();
      },
      (error) => {
        console.error('Error updating hotel:', error);
      }
    );
    this.closeModel();
  }

  saveHotel() {
    this.hotelService.addHotel(this.hotelObj).subscribe(
      (data) => {
        this.hotelList.push(data);
        this.requestedHotelsList.push(data);
      },
      (error) => {
        console.error('Error saving hotel:', error);
      }
    );
    this.closeModel();
  }

  changeHotels() {
    this.state = !this.state;
    if (this.state === true) {
      this.showingList = this.hotelList;
    } else {
      this.showingList = this.requestedHotelsList;
    }
  }
  approveHotel(item: Hotel) {
    item.approved = true;
    this.hotelService.updateHotel(item).subscribe(
      () => {
        const index = this.hotelList.findIndex((m) => m._id === item._id);
        if (index !== -1) {
          this.hotelList[index] = item;
          this.requestedHotelsList[index] = item;
        }
        this.state = !this.state;
        this.loadHotels();
      },
      (error) => {
        console.error('Error updating hotel:', error);
      }
    );
  }
}
