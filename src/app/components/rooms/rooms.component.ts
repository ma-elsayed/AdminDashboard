import { INewRoom, IRooms } from './../../models/room';
import { Component, OnInit } from '@angular/core';
// import { Room } from '../../models/room';
import { RoomService } from '../../services/room.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Hotel } from '../../models/hotel';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  hotelId: string = '';
  roomId: string = '';
  roomsList: IRooms[] = [];
  requestedRoomsList: IRooms[] = [];
  showingList: IRooms[] = [];
  newRoom: INewRoom = {} as INewRoom;
  editingRoom: INewRoom = {} as INewRoom;
  state: boolean = true;
  incomingHotelId: any;
  constructor(
    private roomService: RoomService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const hotelId = this.route.snapshot.params['id'];
    if (hotelId) {
      this.hotelId = hotelId;
      this.loadRoomsByHotelId(hotelId);
    } else {
      this.loadRooms();
    }
  }

  loadRoomsByHotelId(hotelId: string) {
    this.roomService.getAllRoomsById(hotelId).subscribe({
      next: (response) => {
        this.roomsList = response.data;
      },
    });
  }

  loadRooms() {
    this.roomService.getAllRooms().subscribe({
      next: (response) => {
        this.roomsList = response.data.filter((room) => room.approved === true);
        this.requestedRoomsList = response.data.filter(
          (room) => room.approved === false
        );
        this.showingList = this.roomsList;
      },
      error: (error) => {
        console.error('Error loading hotels:', error);
      },
    });
  }

  openNewModal(): void {
    const modal = document.getElementById('newRoomModal');
    if (modal != null) {
      modal.style.display = 'block';
    }
  }

  closeNewModal(): void {
    const modal = document.getElementById('newRoomModal');
    if (modal != null) {
      modal.style.display = 'none';
    }
  }
  openUpdateModal() {
    const modal = document.getElementById('updateRoomModal');
    if (modal != null) {
      modal.style.display = 'block';
    }
  }
  closeUpdateModal(): void {
    const modal = document.getElementById('updateRoomModal');
    if (modal != null) {
      modal.style.display = 'none';
    }
  }

  onDelete(item: IRooms) {
    const isDelete = confirm('Are you sure you want to Delete?');
    if (isDelete) {
      this.roomService.deleteRoom(item._id).subscribe({
        next: () => {
          this.loadRooms();
          this.roomsList = this.roomsList.filter(
            (hotel) => hotel._id == item._id
          );
        },
        error: (error) => {
          console.error('Error deleting hotel:', error);
        },
      });
    }
  }

  onEdit(room: IRooms) {
    this.roomId = room._id;
    this.editingRoom = {
      roomType: room.roomType,
      bedType: room.bedType,
      guestNumber: room.guestNumber,
      price: room.price,
    };
    this.openUpdateModal();
  }

  updateRoom(room: INewRoom) {
    console.log(this.roomId);
    console.log(room);
    this.roomService.updateRoom(this.roomId, room).subscribe({
      next: () => {
        this.loadRooms();
      },
      error: (error) => {
        console.error('Error updating hotel:', error);
      },
    });
    this.closeUpdateModal();
  }

  saveRoom() {
    this.roomService.saveRoom(this.hotelId, this.newRoom).subscribe({
      next: (data) => {
        this.loadRoomsByHotelId(this.hotelId);
      },
      error: (error) => {
        console.error('Error saving hotel:', error);
      },
    });
    this.closeNewModal();
  }
  changeRooms() {
    this.state = !this.state;
    if (this.state === true) {
      this.showingList = this.roomsList;
    } else {
      this.showingList = this.requestedRoomsList;
    }
  }
}
