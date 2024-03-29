import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room ,IRoom } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = "http://localhost:3090/rooms"
  ;

  constructor(private http: HttpClient) { }

  getAllRooms(hotelId: string): Observable<{message :string,data :Room[]}> {
    const url = `${this.apiUrl}/${hotelId}`;
    return this.http.get<{message :string,data :Room[]}>(url);
  }

  saveRoom(hotelId: string, room: IRoom): Observable<Room> {
    const url = `${this.apiUrl}/${hotelId}`;
    return this.http.post<Room>(url, room);
  }

  updateRoom(roomId: string, room: Room): Observable<any> {
    const url = `${this.apiUrl}/room/${roomId}`;
    return this.http.patch<any>(url, room);
  }

  deleteRoom(roomId: string): Observable<any> {
    const url = `${this.apiUrl}/room/${roomId}`;
    return this.http.delete<any>(url);
  }
}
