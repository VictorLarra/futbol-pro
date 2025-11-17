// partidos/crear/crear.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PartidosService } from '../services/partidos.service';
import { EquiposService } from '../../equipos/services/equipos.service';
import { Partido } from '../interfaces/partido.interface';
import { Equipo } from '../../equipos/interfaces/equipo.interface';

@Component({
  selector: 'app-crear-partido',
  templateUrl: './crear.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class CrearPartidoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private partidosService = inject(PartidosService);
  private equiposService = inject(EquiposService);
  private router = inject(Router);

  equipos: Equipo[] = [];
  loading: boolean = false;
  error: string = '';

  partidoForm = this.fb.group({
    fecha: ['', Validators.required],
    id_equipo_local: [0, [Validators.required, Validators.min(1)]],
    id_equipo_visitante: [0, [Validators.required, Validators.min(1)]],
    goles_local: [0, [Validators.required, Validators.min(0)]],
    goles_visitante: [0, [Validators.required, Validators.min(0)]]
  });

  ngOnInit(): void {
    this.cargarEquipos();
  }

  cargarEquipos(): void {
    this.loading = true;
    this.equiposService.getAll().subscribe({
      next: (equipos) => {
        this.equipos = equipos;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar equipos:', error);
        this.error = 'Error al cargar los equipos';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.partidoForm.valid && this.equiposDiferentes()) {
      this.loading = true;
      
      const formValue = this.partidoForm.value;
      const partidoData: Partido = {
        id: 0, // El backend asignará el ID
        fecha: formValue.fecha!,
        id_equipo_local: formValue.id_equipo_local!,
        id_equipo_visitante: formValue.id_equipo_visitante!,
        goles_local: formValue.goles_local!,
        goles_visitante: formValue.goles_visitante!,
        estadio: '' // Valor temporal, el backend puede asignar el estadio real
      };

      this.partidosService.create(partidoData).subscribe({
        next: (response) => {
          console.log('Partido creado:', response);
          this.router.navigate(['/partidos']);
        },
        error: (error) => {
          console.error('Error al crear partido:', error);
          this.error = 'Error al crear el partido';
          this.loading = false;
        }
      });
    }
  }

  // Validación para evitar que un equipo juegue contra sí mismo
  equiposDiferentes(): boolean {
    const local = this.partidoForm.get('id_equipo_local')?.value;
    const visitante = this.partidoForm.get('id_equipo_visitante')?.value;
    return local !== visitante;
  }

  // Establecer fecha y hora actual como valor por defecto
  establecerFechaActual(): void {
    const ahora = new Date();
    // Ajustar a formato datetime-local (YYYY-MM-DDTHH:MM)
    const fechaFormateada = ahora.toISOString().slice(0, 16);
    this.partidoForm.patchValue({ fecha: fechaFormateada });
  }
}