// partidos/editar/editar.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PartidosService } from '../services/partidos.service';
import { EquiposService } from '../../equipos/services/equipos.service';
import { Partido } from '../interfaces/partido.interface';
import { Equipo } from '../../equipos/interfaces/equipo.interface';

@Component({
  selector: 'app-editar-partido',
  templateUrl: './editar.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class EditarPartidoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private partidosService = inject(PartidosService);
  private equiposService = inject(EquiposService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  partidoId!: number;
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
    this.partidoId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarEquipos();
  }

  cargarEquipos(): void {
    this.equiposService.getAll().subscribe({
      next: (equipos) => {
        this.equipos = equipos;
        this.cargarPartido();
      },
      error: (error) => {
        console.error('Error al cargar equipos:', error);
        this.error = 'Error al cargar los equipos';
      }
    });
  }

  cargarPartido(): void {
    this.loading = true;
    this.partidosService.getById(this.partidoId).subscribe({
      next: (partido: Partido) => {
        // Formatear fecha para el input datetime-local
        const fecha = new Date(partido.fecha);
        const fechaFormateada = fecha.toISOString().slice(0, 16);
        
        this.partidoForm.patchValue({
          fecha: fechaFormateada,
          id_equipo_local: partido.id_equipo_local,
          id_equipo_visitante: partido.id_equipo_visitante,
          goles_local: partido.goles_local,
          goles_visitante: partido.goles_visitante
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar partido:', error);
        this.error = 'Error al cargar los datos del partido';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.partidoForm.valid) {
      this.loading = true;
      
      const formValue = this.partidoForm.value;
      const partidoData: Partido = {
        id: this.partidoId,
        fecha: formValue.fecha!,
        id_equipo_local: formValue.id_equipo_local!,
        id_equipo_visitante: formValue.id_equipo_visitante!,
        goles_local: formValue.goles_local!,
        goles_visitante: formValue.goles_visitante!,
        estadio: '' // Valor temporal, el backend puede asignar el estadio real
      };

      this.partidosService.update(this.partidoId, partidoData).subscribe({
        next: () => {
          this.router.navigate(['/partidos']);
        },
        error: (error) => {
          console.error('Error al actualizar partido:', error);
          this.error = 'Error al actualizar el partido';
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
}