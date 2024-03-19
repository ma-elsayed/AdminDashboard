import { Routes } from '@angular/router';
import { UsersParentComponent } from './components/users-parent/users-parent.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { RoomsComponent } from './components/rooms/rooms.component';

export const routes: Routes = [
  {
    path: '',
    component: UsersParentComponent,
  },
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"dashboard",
  component:DashboardComponent,
children:[
  {path:"", component:HomeComponent},
  {path:"hotels", component:HotelsComponent},
  {path:"rooms", component:RoomsComponent},
]
},
];
