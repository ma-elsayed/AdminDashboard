import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm! :FormGroup;

  constructor(private http: HttpClient) {}

  submit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.http.post('http://localhost:3090/admin/login', formData)
        .subscribe((res : any) => {

          alert("Login successful");

        }, (error) => {

          console.error("Login failed", error);
          alert("Login failed");
        });
    }
  }




ngOnInit(): void {
this.setForm


}

setForm(){
  this.loginForm= new FormGroup({
    email : new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required]),
  })
}



}
