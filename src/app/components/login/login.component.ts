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
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // loginForm!: FormGroup;

  // submit() {
  //   if (this.loginForm.valid) {
  //     const formData = this.loginForm.value;
  //     this.http.post('http://localhost:3090/admin/login', formData).subscribe(
  //       (res: any) => {
  //         console.log(res);
  //         alert('Login successful');
  //       },
  //       (error) => {
  //         console.error('Login failed', error);
  //         alert('Login failed');
  //       }
  //     );
  //   }
  // }

  // ngOnInit(): void {
  //   this.setForm;
  // }

  // setForm() {
  //   this.loginForm = new FormGroup({
  //     userName: new FormControl('', [Validators.required]),
  //     password: new FormControl('', [Validators.required]),
  //   });
  // }
  constructor(private AdminService: AdminService, private router: Router) {}

  userName: string = '';
  password: string = '';

  submit(event: Event) {
    event.preventDefault();
    const formData = {
      userName: this.userName,
      password: this.password,
    };
    this.AdminService.adminLogin(formData).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.userName);
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Login failed', error);
        alert('Login failed');
      },
    });
  }
}
