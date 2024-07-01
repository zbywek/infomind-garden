import { Component } from '@angular/core';
import {RouterLinkActive, RouterModule} from "@angular/router";
import {AdInfoComponent} from "../ad-info/ad-info.component";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterModule,
    RouterLinkActive,
    AdInfoComponent
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

}
