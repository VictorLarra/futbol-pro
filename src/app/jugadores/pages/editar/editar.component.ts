// jugadores/editar/editar.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JugadoresService } from '../../services/jugadores.service';
import { Jugador } from '../../interfaces/jugador.interface';

@Component({
  selector: 'app-editar-jugador',
  templateUrl: './editar.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class EditarJugadorComponent implements OnInit {
  private fb = inject(FormBuilder);
  private jugadoresService = inject(JugadoresService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  jugadorId!: number;
  loading: boolean = false;
  error: string = '';

  jugadorForm = this.fb.group({
    nombre: ['', Validators.required],
    posicion: ['', Validators.required],
    edad: [0, [Validators.required, Validators.min(16), Validators.max(50)]],
    id_equipo: [null as number | null]
  });

  ngOnInit(): void {
    this.jugadorId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarJugador();
  }

  cargarJugador(): void {
    this.loading = true;
    this.jugadoresService.getById(this.jugadorId).subscribe({
      next: (jugador: Jugador) => {
        this.jugadorForm.patchValue({
          nombre: jugador.nombre,
          posicion: jugador.posicion,
          edad: jugador.edad,
          id_equipo: jugador.id_equipo
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar jugador:', error);
        this.error = 'Error al cargar los datos del jugador';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.jugadorForm.valid) {
      this.loading = true;
      const jugadorData: Jugador = {
        id: this.jugadorId,
        ...this.jugadorForm.value
      } as Jugador;

      this.jugadoresService.update(this.jugadorId, jugadorData).subscribe({
        next: () => {
          this.router.navigate(['/jugadores']). then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          console.error('Error al actualizar jugador:', error);
          this.error = 'Error al actualizar el jugador';
          this.loading = false;
        }
      });
    }
  }
}