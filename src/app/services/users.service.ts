import { Injectable } from '@angular/core';
import { IUser } from '../models/iuser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable()
export class UsersService {
  private adminToken: string | undefined;
  private http: any;
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
  getUsers(): Observable<any> {
    return this.httpClient.get<any>(
      'http://localhost:3090/admin/users',
      this.http
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.httpClient.delete<any>(
      `http://localhost:3090/admin/users/${id}`,
      this.http
    );
  }
}