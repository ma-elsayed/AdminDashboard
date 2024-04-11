import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INewRoom, IRooms } from '../models/room';
import { IResponse } from './../models/iresponse';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}

  getAllRooms(): Observable<IResponse<IRooms>> {
    return this.http.get<IResponse<IRooms>>(`${environment.baseURL}/rooms`);
  }
  getAllRoomsById(hotelId: string): Observable<IResponse<IRooms>> {
    return this.http.get<IResponse<IRooms>>(
      `${environment.baseURL}/rooms/${hotelId}`
    );
  }

  saveRoom(hotelId: string, room: INewRoom): Observable<IRooms> {
    return this.http.post<IRooms>(
      `${environment.baseURL}/rooms/${hotelId}`,
      room
    );
  }

  updateRoom(roomId: string, room: INewRoom): Observable<any> {
    return this.http.patch<any>(
      `${environment.baseURL}/rooms/room/${roomId}`,
      room
    );
  }

  deleteRoom(roomId: string): Observable<IRooms> {
    return this.http.delete<IRooms>(
      `${environment.baseURL}/rooms/room/${roomId}`
    );
  }
}
