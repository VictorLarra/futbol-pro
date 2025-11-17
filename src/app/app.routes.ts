// import { Routes } from '@angular/router';

// import { MainPageComponent } from './main-page/main-page.component';
// //EQUIPOS
// import { ListarEquiposComponent } from './equipos/pages/listar/listar.component';
// import { CrearEquipoComponent } from './equipos/pages/crear/crear.component';
// import { EditarEquipoComponent } from './equipos/pages/editar/editar.component';
// //JUGADORES
// import { CrearJugadorComponent } from './jugadores/pages/crear/crear.component';
// import { ListarJugadoresComponent } from './jugadores/pages/listar/listar.component';
// import { EditarJugadorComponent } from './jugadores/pages/editar/editar.component';
// export const routes: Routes = [

//   //PARTIDOS
// import { ListarPartidosComponent } from './partidos/listar/listar.component';
// import { CrearPartidoComponent } from './partidos/crear/crear.component';
// import { EditarPartidoComponent } from './partidos/editar/editar.component';



//   // Página principal
//   { path: '', component: MainPageComponent },

//   // Rutas de Equipos
//   {
//     path: 'equipos',
//     children: [
//       { path: '', component: ListarEquiposComponent },
//       {path: 'listar', component: ListarEquiposComponent }, 
//       { path: 'crear', component: CrearEquipoComponent },
//       { path: 'editar/:id', component: EditarEquipoComponent }
//     ]
//   },
// {

//   //rutas de Jugadores
//   path: 'jugadores',
//   children: [
//     {path: '', component: ListarJugadoresComponent },
//     {path: 'crear', component: CrearJugadorComponent },
//     {path: 'listar', component: ListarJugadoresComponent },
//     {path: 'editar/:id', component: EditarJugadorComponent }

//     ]  },
//   // Cualquier ruta inválida vuelve a la main page
//   { path: '**', redirectTo: 'jugadores/listar' },

//   //rutas de Partidos
// {
//   path: 'partidos',
//   children: [
//     { path: '', component: ListarPartidosComponent },
//     { path: 'crear', component: CrearPartidoComponent },
//     { path: 'editar/:id', component: EditarPartidoComponent }
//   ]
// }
// ];
import { Routes } from '@angular/router';

import { MainPageComponent } from './main-page/main-page.component';

// EQUIPOS
import { ListarEquiposComponent } from './equipos/pages/listar/listar.component';
import { CrearEquipoComponent } from './equipos/pages/crear/crear.component';
import { EditarEquipoComponent } from './equipos/pages/editar/editar.component';

// JUGADORES
import { CrearJugadorComponent } from './jugadores/pages/crear/crear.component';
import { ListarJugadoresComponent } from './jugadores/pages/listar/listar.component';
import { EditarJugadorComponent } from './jugadores/pages/editar/editar.component';

// PARTIDOS
import { ListarPartidosComponent } from './partidos/listar/listar.component';
import { CrearPartidoComponent } from './partidos/crear/crear.component';
import { EditarPartidoComponent } from './partidos/editar/editar.component';

export const routes: Routes = [
  // Página principal
  { path: '', component: MainPageComponent },

  // Rutas de Equipos
  {
    path: 'equipos',
    children: [
      { path: '', component: ListarEquiposComponent },
      { path: 'listar', component: ListarEquiposComponent }, 
      { path: 'crear', component: CrearEquipoComponent },
      { path: 'editar/:id', component: EditarEquipoComponent }
    ]
  },

  // Rutas de Jugadores
  {
    path: 'jugadores',
    children: [
      { path: '', component: ListarJugadoresComponent },
      { path: 'crear', component: CrearJugadorComponent },
      { path: 'listar', component: ListarJugadoresComponent },
      { path: 'editar/:id', component: EditarJugadorComponent }
    ]
  },

  // Rutas de Partidos
  {
    path: 'partidos',
    children: [
      { path: '', component: ListarPartidosComponent },
      { path: 'crear', component: CrearPartidoComponent },
      { path: 'editar/:id', component: EditarPartidoComponent }
    ]
  },

  // Cualquier ruta inválida vuelve a la main page
  { path: '**', redirectTo: '' }
];