import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EquiposService } from '../../services/equipos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-equipo',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class EditarEquipoComponent implements OnInit {

  equipo = {
    id: 0,
    nombre: '',
    ciudad: '',
    estadio: '',
    anioFundacion: null,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private equiposService: EquiposService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarEquipo(id);
  }

  cargarEquipo(id: number) {
    this.equiposService.getById(id).subscribe({
      next: (data) => {
        this.equipo = data;
      },
      error: (error) => {
        console.error('Error al cargar equipo', error);
      }
    });
  }

  guardarCambios() {
    this.equiposService.update(this.equipo.id, this.equipo).subscribe({
      next: () => {
        this.router.navigate(['/equipos']);
      },
      error: (error) => {
        console.error('Error al actualizar equipo', error);
      }
    });
  }

}
