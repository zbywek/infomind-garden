import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ContactComponent} from "./contact/contact.component";
import {LoginComponent} from "./login/login.component";
import {DevicesControlComponent} from "./devices-control/devices-control.component";

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'devices-control', component: DevicesControlComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'login', component:LoginComponent}

];
