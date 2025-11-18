import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FooterComponent } from "./shared/footer/footer.component";


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'futbol-pro';
}
