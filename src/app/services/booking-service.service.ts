import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BookingServiceService {
  adminToken: string | undefined;
  http: any;
  constructor(private httpClient: HttpClient) {
    this.http = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  setAdminToken(token: string) {
    this.adminToken = token;
    this.http.headers = this.http.headers.set(
      'Authorization',
      `Bearer ${this.adminToken}`
    );
  }

  getBookings(): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseURL}/booking`);
  }
}
