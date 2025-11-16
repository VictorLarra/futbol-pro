import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  
  constructor(private router: Router) {}

  irAEquipos() {
    this.router.navigate(['/equipos']);
  }

  irACrear() {
    this.router.navigate(['/crear']);
  }
}
