// import { Component } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-main-page',
//   standalone: true,
//   imports: [RouterModule],
//   templateUrl: './main-page.component.html',
//   styleUrl: './main-page.component.css'
// })
// export class MainPageComponent {
  
//   constructor(private router: Router) {}

//   irAEquipos() {
//     this.router.navigate(['/equipos']);
//   }

//   irACrear() {
//     this.router.navigate(['/crear']);
//   }
// }
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class MainPageComponent {
  modules = [
    {
      title: 'Equipos',
      description: 'Gestiona equipos, crea nuevos y consulta la lista completa.',
      icon: 'bi-people',
      color: 'primary',
      actions: [
        { label: 'Ver Equipos', route: '/equipos', icon: 'bi-list' },
        { label: 'Añadir Equipo', route: '/equipos/crear', icon: 'bi-plus-circle' }
      ]
    },
    {
      title: 'Jugadores',
      description: 'Registra jugadores y administra el plantel de cada equipo.',
      icon: 'bi-person-badge',
      color: 'success',
      actions: [
        { label: 'Ver Jugadores', route: '/jugadores', icon: 'bi-list' },
        { label: 'Añadir Jugador', route: '/jugadores/crear', icon: 'bi-plus-circle' }
      ]
    },
    {
      title: 'Partidos',
      description: 'Organiza y consulta información sobre encuentros deportivos.',
      icon: 'bi-calendar-event',
      color: 'warning',
      actions: [
        { label: 'Ver Partidos', route: '/partidos', icon: 'bi-list' },
        { label: 'Programar Partido', route: '/partidos/crear', icon: 'bi-plus-circle' }
      ]
    }
  ];
}