import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IResponse } from '../models/iresponse';
import { IUser } from '../models/iuser';

@Injectable()
export class UsersService {
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
  registerUser(userData: any) {
    return this.httpClient.post<any>(
      `${environment.baseURL}/admin/register`,
      userData
    );
  }

  getUser(userId: string): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.baseURL}/admin/users/${userId}`,
      this.http
    );
  }

  getUsers(): Observable<IResponse<IUser>> {
    return this.httpClient.get<IResponse<IUser>>(
      `${environment.baseURL}/admin/users`,
      { headers: this.http.headers }
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.baseURL}/admin/users/${id}`,
      this.http
    );
  }

  updateUser(id: string, newData: {}): Observable<any> {
    return this.httpClient.patch<any>(
      `${environment.baseURL}/admin/users/${id}`,
      newData,
      this.http
    );
  }

  getBookingForUser(userId: string): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.baseURL}/admin/bookings/user/${userId}`,
      this.http
    );
  }
}
