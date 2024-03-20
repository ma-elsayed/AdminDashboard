import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../models/iuser';
import { UsersService } from '../../services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-parent',
  standalone: true,
  imports: [HttpClientModule, HeaderComponent, CommonModule],
  templateUrl: './users-parent.component.html',
  styleUrls: ['./users-parent.component.scss'],
})
export class UsersParentComponent implements OnInit, OnDestroy {
  users: IUser[] | undefined;
  usersRequest: any;
  constructor(private UserService: UsersService) {}

  toggleUserActive(user: IUser) {
    this.UserService.updateUser(user._id, { active: !user.active }).subscribe({
      next: (res) => {
        if (user.active === true) {
          alert('User deactivated');
        } else {
          alert('User activated');
        }
        location.reload();
      },
      error: (error) => {
        console.error('User update failed', error);
        alert('User update failed');
      },
    });
  }
  updateUser(userId: string, newData: any) {
    if (confirm('Are you sure you want to delete this user') === true) {
      this.UserService.updateUser(userId, newData).subscribe({
        next: (res) => {
          alert('User deleted');
          location.reload();
        },
        error: (err) => {
          if (err.status == 403) {
            alert('You are not allowed to delete this user');
          }
        },
      });
    }
  }
  ngOnInit(): void {
    const adminToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdHJvbGUiLCJpZCI6IjY1ZjkyNzk2NzdkYzM5MzEzYmVhMGY1MyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMDkzNDI0OSwiZXhwIjoxNzEwOTQ4NjQ5fQ.Tq7dv4WattsRm_L42PG9M-RjplU9eby2gCmbVPC2yro';
    this.UserService.setAdminToken(adminToken);
    this.usersRequest = this.UserService.getUsers().subscribe((users) => {
      this.users = users.data;
      console.log(this.users);
    });
  }
  ngOnDestroy(): void {
    this.usersRequest.unsubscribe();
  }
}
