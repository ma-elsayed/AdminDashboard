import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable()
export class UsersService {
  private adminToken: string | undefined;
  private http: any;
  constructor(private httpClient: HttpClient) {
    this.http = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${environment.adminToken}`,
      }),
    };
  }

  // setAdminToken(token: string) {
  //   this.adminToken = token;
  //   this.http.headers = this.http.headers.set(
  //     'Authorization',
  //     `Bearer ${this.adminToken}`
  //   );
  // }

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

  getUsers(): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.baseURL}/admin/users`,
      this.http
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
