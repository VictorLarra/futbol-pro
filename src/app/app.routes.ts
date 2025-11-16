import { Routes } from '@angular/router';

import { MainPageComponent } from './main-page/main-page.component';
import { ListarEquiposComponent } from './equipos/pages/listar/listar.component';
import { CrearEquipoComponent } from './equipos/pages/crear/crear.component';
import { EditarEquipoComponent } from './equipos/pages/editar/editar.component';

export const routes: Routes = [

  // Página principal
  { path: '', component: MainPageComponent },

  // Rutas de Equipos
  {
    path: 'equipos',
    children: [
      { path: '', component: ListarEquiposComponent },
      { path: 'crear', component: CrearEquipoComponent },
      { path: 'editar/:id', component: EditarEquipoComponent }
    ]
  },

  // Cualquier ruta inválida vuelve a la main page
  { path: '**', redirectTo: '' }
];
