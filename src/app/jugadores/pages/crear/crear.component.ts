// // jugadores/crear/crear.component.ts
// import { Component, inject } from '@angular/core';
// import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { JugadoresService } from '../../services/jugadores.service';
// import { Jugador } from '../../interfaces/jugador.interface';

// @Component({
//   selector: 'app-crear-jugador',
//   templateUrl: './crear.component.html',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule]
// })
// export class CrearJugadorComponent {
//   private fb = inject(FormBuilder);
//   private jugadoresService = inject(JugadoresService);
//   private router = inject(Router);

//   jugadorForm = this.fb.group({
//     nombre: ['', Validators.required],
//     posicion: ['', Validators.required],
//     edad: [0, [Validators.required, Validators.min(16), Validators.max(50)]],
//     id_equipo: [null as number | null]
//   });

//   onSubmit() {
//     if (this.jugadorForm.valid) {
//       this.jugadoresService.create(this.jugadorForm.value as Jugador).subscribe({
//         next: () => {
//           this.router.navigate(['/jugadores/listar']);
//         },
//         error: (error) => {
//           console.error('Error:', error);
//         }
//       });
//     }
//   }
// }
// jugadores/crear/crear.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JugadoresService } from '../../services/jugadores.service';
import { EquiposService } from '../../../equipos/services/equipos.service'; // 👈 Importa el servicio de equipos
import { Jugador } from '../../interfaces/jugador.interface';
import { Equipo } from '../../../equipos/interfaces/equipo.interface';

@Component({
  selector: 'app-crear-jugador',
  templateUrl: './crear.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class CrearJugadorComponent implements OnInit {
  private fb = inject(FormBuilder);
  private jugadoresService = inject(JugadoresService);
  private equiposService = inject(EquiposService); // 👈 Inyecta el servicio
  private router = inject(Router);

  equipos: Equipo[] = []; // 👈 Lista de equipos
  loading: boolean = false;
  error: string = '';

  jugadorForm = this.fb.group({
    nombre: ['', Validators.required],
    posicion: ['', Validators.required],
    edad: [0, [Validators.required, Validators.min(16), Validators.max(50)]],
    id_equipo: [null as number | null] // Permitir null
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
      error: (error: any) => {
        console.error('Error al cargar equipos:', error);
        this.error = 'Error al cargar los equipos';
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (this.jugadorForm.valid) {
      this.loading = true;
      
      const formData = this.jugadorForm.value;
      const jugadorData: Jugador = {
        id: 0, // El backend asignará el ID
        nombre: formData.nombre!,
        posicion: formData.posicion!,
        edad: formData.edad!,
        id_equipo: formData.id_equipo || null // Manejar el caso null
      };

      this.jugadoresService.create(jugadorData).subscribe({
        next: (response) => {
          console.log('Jugador creado:', response);
          this.router.navigate(['/jugadores']);
        },
        error: (error) => {
          console.error('Error:', error);
          this.error = 'Error al crear el jugador';
          this.loading = false;
        }
      });
    }
  }
}