// jugadores/crear/crear.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JugadoresService } from '../../services/jugadores.service';
import { Jugador } from '../../interfaces/jugador.interface';

@Component({
  selector: 'app-crear-jugador',
  templateUrl: './crear.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class CrearJugadorComponent {
  private fb = inject(FormBuilder);
  private jugadoresService = inject(JugadoresService);
  private router = inject(Router);

  jugadorForm = this.fb.group({
    nombre: ['', Validators.required],
    posicion: ['', Validators.required],
    edad: [0, [Validators.required, Validators.min(16), Validators.max(50)]],
    id_equipo: [null as number | null]
  });

  onSubmit() {
    if (this.jugadorForm.valid) {
      this.jugadoresService.create(this.jugadorForm.value as Jugador).subscribe({
        next: () => {
          this.router.navigate(['/jugadores/listar']);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
  }
}