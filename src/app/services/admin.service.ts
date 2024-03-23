import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private HttpClient: HttpClient) {}

  adminLogin(adminData: any) {
    return this.HttpClient.post(
      `${environment.baseURL}/admin/login`,
      adminData
    );
  }
}
