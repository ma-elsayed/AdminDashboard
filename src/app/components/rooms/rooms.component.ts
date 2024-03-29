import { IRoom, Room } from './../../models/room';
import { Component, OnInit } from '@angular/core';
// import { Room } from '../../models/room';
import { RoomService } from '../../services/room.service';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Hotel } from '../../models/hotel';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [RouterOutlet, FormsModule,CommonModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  hotelId: string = '65f05c34495b34feb7746a2a';
  hotelList: Room[]  = [];
  newRoom: IRoom = { hotelId: { _id: '' },  hotelName: '', roomType: '', bedType: '', guestNumber: 0, price: 0  };
  editingRoom: Room  = {} as Room;
retrievedRoom:Room= {} as Room ;
  constructor(private roomService: RoomService , public router: Router) { }


  ngOnInit(){
    this.loadHotels();
  }

  loadHotels(){
    this.roomService.getAllRooms(this.hotelId).subscribe(
          (response) => {
            console.log(response)
            this.hotelList = response.data;

      //   this.hotelList = data.data;
        // console.log(this.hotelList)
      },
      error => {
        console.error('Error loading hotels:', error);
      }
    );
  }

  openModel() {

    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }

  closeModel(): void {
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'none';
    }


  }

  onDelete(item: Room){
    const isDelete = confirm('Are you sure you want to Delete?');
    if (isDelete) {
      this.roomService.deleteRoom(item._id).subscribe(
        () => {
          this.loadHotels()
          // this.hotelList = this.hotelList.filter(hotel => hotel._id == item._id);
        },
        error => {
          console.error('Error deleting hotel:', error);
        }
      );
    }
  }

  onEdit(item: Room){
    this.editingRoom = item;
    this.openModel();
  }


  updateRoom(room: Room){
    this.roomService.updateRoom(room._id, room).subscribe(
      () => {
        const index = this.hotelList.findIndex(m => m._id === this.retrievedRoom._id);
        if (index !== -1) {
          this.hotelList[index] = this.retrievedRoom;
        }
      },
      error => {
        console.error('Error updating hotel:', error);
      }
    );
    this.closeModel();
  }




  saveRoom() {
    console.log(this.newRoom)


    this.roomService.saveRoom(this.hotelId, this.newRoom).subscribe(


      data => {
        this.loadHotels()
        // this.hotelList.push(data);
      },
      error => {
        console.error('Error saving hotel:', error);
      }
    );
    this.closeModel();
  }





}

