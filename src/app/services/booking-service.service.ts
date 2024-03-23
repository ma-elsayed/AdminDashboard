import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.development';
import { IResponse } from '../models/iresponse';
import { IBooking } from '../models/ibooking';

@Injectable({
  providedIn: 'root',
})
export class BookingServiceService {
  private adminToken: string | null = localStorage.getItem('token');
  private http: { headers: HttpHeaders };
  constructor(private httpClient: HttpClient) {
    this.http = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.adminToken}`,
      }),
    };
  }

  getBookings(): Observable<IResponse<IBooking>> {
    return this.httpClient.get<IResponse<IBooking>>(
      `${environment.baseURL}/booking`
    );
  }
}
