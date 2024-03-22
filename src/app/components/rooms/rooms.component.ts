import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [RouterOutlet, FormsModule,CommonModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit {
  @ViewChild('myModal') model: ElementRef | undefined;
  hotelObj: Hotel = new Hotel();
  hotelList: Hotel[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem("angular17crud");
    if(localData != null) {
      this.hotelList = JSON.parse(localData)
    }
  }

  openModel() {

    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }

  closeModel() {
    this.hotelObj = new Hotel();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  onDelete(item: Hotel) {
    const isDelet = confirm("Are you sure want to Delete");
    if(isDelet) {
      const currentRecord =  this.hotelList.findIndex(m=> m.id === this.hotelObj.id);
      this.hotelList.splice(currentRecord,1);
      localStorage.setItem('http://localhost:3090/hotels', JSON.stringify(this.hotelList));
    }
  }
  onEdit(item: Hotel) {
    this.hotelObj =  item;
    this.openModel();
  }

  updateHotel() {
      const currentRecord =  this.hotelList.find(m=> m.id === this.hotelObj.id);
      if(currentRecord != undefined) {
        currentRecord.hotelName = this.hotelObj.hotelName;
        currentRecord.hotelCity =  this.hotelObj.hotelCity;
        currentRecord.hotelMainImage =  this.hotelObj.hotelMainImage;
      };
      localStorage.setItem('http://localhost:3090/hotels', JSON.stringify(this.hotelList));
      this.closeModel()
  }
  saveHotel() {
    debugger;
    const isLocalPresent = localStorage.getItem('http://localhost:3090/hotels');
    if (isLocalPresent != null) {

      const oldArray = JSON.parse(isLocalPresent);
      this.hotelObj.id = oldArray.length + 1;
      oldArray.push(this.hotelObj);
      this.hotelList = oldArray;
      localStorage.setItem('http://localhost:3090/hotels', JSON.stringify(oldArray));
    } else {
      const newArr = [];
      newArr.push(this.hotelObj);
      this.hotelObj.id = 1;
      this.hotelList = newArr;
      localStorage.setItem('http://localhost:3090/hotels', JSON.stringify(newArr));
    }
    this.closeModel()
  }
}


export class Hotel {
  id: number;
  hotelName: string;
  hotelDescription: string;
  hotelSubDescription: string;
  hotelMainImage: string;
  hotelCity: string;

  constructor() {
    this.id = 0;
    this.hotelName = '';
    this.hotelDescription = '';
    this.hotelSubDescription = '';
    this.hotelSubDescription = '';
    this.hotelMainImage = '';
    this.hotelCity = '';

  }


}
