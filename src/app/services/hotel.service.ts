import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private apiUrl = 'http://localhost:3090/hotels';

  constructor(private http: HttpClient) {}

  getHotels(): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/getall`);
  }

  addHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.apiUrl, hotel);
  }

  updateHotel(hotel: Hotel): Observable<Hotel> {
    const url = `${this.apiUrl}/${hotel._id}`;
    return this.http.patch<Hotel>(url, hotel);
  }

  deleteHotel(_id: string): Observable<Hotel> {
    const url = `${this.apiUrl}/${_id}`;
    return this.http.delete<Hotel>(url);
  }
}
