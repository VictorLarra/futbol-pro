import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EquiposService } from '../../services/equipos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class CrearEquipoComponent {

  equipo = {
    nombre: '',
    ciudad: '',
    estadio: '',
    anioFundacion: null
  };

  constructor(
    private equiposService: EquiposService,
    private router: Router
  ) {}

  crearEquipo() {
    this.equiposService.create(this.equipo).subscribe({
      next: () => {
        this.router.navigate(['/equipos']);
      },
      error: (error) => {
        console.error('Error al crear equipo:', error);
      }
    });
  }

}
