import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../../models/iuser';
import { UsersService } from '../../../services/users.service';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-parent',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './users-parent.component.html',
  styleUrls: ['./users-parent.component.scss'],
})
export class UsersParentComponent implements OnInit, OnDestroy {
  filteredUsers: any;
  searchValue: string = '';
  users: IUser[] | undefined;
  usersRequest: any;
  constructor(private UserService: UsersService, public router: Router) {}

  searchUser(searchValue: string) {
    if (searchValue) {
      this.filteredUsers = this.users?.filter((user) => {
        return (
          user.userName?.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
    } else {
      this.filteredUsers = this.users;
    }
  }

  toggleUserActive(user: IUser, event: MouseEvent) {
    event.stopPropagation();
    this.UserService.updateUser(user._id, { active: !user.active }).subscribe({
      next: (res) => {
        if (user.active === true) {
          alert('User deactivated');
        } else {
          alert('User activated');
        }
        const updatedUsers = this.users?.map((u) =>
          u._id === user._id ? { ...user, active: !user.active } : u
        );

        this.users = updatedUsers;
        this.filteredUsers = updatedUsers;
      },
      error: (error) => {
        console.error('User update failed', error);
        alert('User update failed');
      },
    });
  }

  userDetails(user: IUser) {
    this.router.navigate(['user/' + user._id]);
  }

  ngOnInit(): void {
    this.usersRequest = this.UserService.getUsers().subscribe((users) => {
      this.users = users.data;
      this.filteredUsers = this.users;
    });
  }
  ngOnDestroy(): void {
    this.usersRequest.unsubscribe();
  }
}
