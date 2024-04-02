import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public userName: string = '';
  public password: string = '';

  constructor(private AdminService: AdminService, private router: Router) {}
  ngOnInit(): void {}

  submit(event: Event): void {
    event.preventDefault();
    const adminLogin = { userName: this.userName, password: this.password };
    console.log(adminLogin);
    this.AdminService.adminLogin(adminLogin).subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.username);
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Login failed');
      },
    });
  }
}
