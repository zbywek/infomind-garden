import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavigationComponent} from "./navigation/navigation.component";
import {FooterComponent} from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'garden-manager';
}
