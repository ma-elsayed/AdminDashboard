import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../models/iuser';
import { UsersService } from '../../services/users.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-users-parent',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './users-parent.component.html',
  styleUrls: ['./users-parent.component.scss'],
})
export class UsersParentComponent implements OnInit, OnDestroy {
  users: IUser[] | undefined;
  usersRequest: any;
  constructor(private UserService: UsersService) {}

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user') === true) {
      this.UserService.deleteUser(userId).subscribe((res) => {
        console.log(res);
      });
      location.reload();
      return;
    } else {
      alert('User not deleted');
    }
  }
  ngOnInit(): void {
    const adminToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdDIiLCJpZCI6IjY1ZjU3YjNiNGEwOTcxYjA1YjE5Y2MzYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMDgwOTM0NiwiZXhwIjoxNzEwODIzNzQ2fQ.Nvo0dTDU4VtvwVnGg94MHV1GDrFEVbaj1iTfohABxDM';
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
