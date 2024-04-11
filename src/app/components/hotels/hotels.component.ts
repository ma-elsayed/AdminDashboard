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

  constructor(private hotelService: HotelService, public router: Router) {}

  ngOnInit() {
    this.loadHotels();
  }

  loadHotels() {
    this.hotelService.getHotels().subscribe(
      (data) => {
        this.hotelList = data.data;
        // console.log(this.hotelList)
      },
      (error) => {
        console.error('Error loading hotels:', error);
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
    // this.router.navigate(['rooms']);
  }

  onDelete(item: Hotel) {
    const isDelete = confirm('Are you sure you want to Delete?');
    if (isDelete) {
      this.hotelService.deleteHotel(item._id).subscribe(
        () => {
          this.hotelList = this.hotelList.filter(
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
        }
      },
      (error) => {
        console.error('Error updating hotel:', error);
      }
    );
    this.closeModel();
  }

  saveHotel() {
    // console.log(this.hotelObj)
    this.hotelService.addHotel(this.hotelObj).subscribe(
      (data) => {
        this.hotelList.push(data);
      },
      (error) => {
        console.error('Error saving hotel:', error);
      }
    );
    this.closeModel();
  }
}
