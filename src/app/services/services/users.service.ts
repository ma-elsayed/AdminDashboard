import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  registerUser(userData: any) {
    return this.http.post<any>('http://localhost:3090/admin/register', userData);
  }
}
