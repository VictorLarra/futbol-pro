import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../services/jugadores.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Jugador } from '../../interfaces/jugador.interface';

@Component({
  selector: 'app-listar-jugadores',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink] // ← Asegúrate de tener RouterLink aquí
})
export class ListarJugadoresComponent implements OnInit {
  
  jugadores: Jugador[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private jugadoresService: JugadoresService) {}

  ngOnInit(): void {
    this.obtenerJugadores();
  }

  obtenerJugadores() {
    this.loading = true;
    this.error = '';
    
    this.jugadoresService.getAll().subscribe({
      next: (data: Jugador[]) => {
        this.jugadores = data;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error al obtener jugadores', error);
        this.error = 'Error al cargar los jugadores';
        this.loading = false;
      }
    });
  }

  eliminarJugador(id: number) {
    if (confirm('¿Seguro que deseas eliminar este jugador?')) {
      this.jugadoresService.delete(id).subscribe({
        next: () => {
          this.jugadores = this.jugadores.filter(j => j.id !== id);
        },
        error: (error) => {
          console.error('Error al eliminar jugador', error);
          alert('Error al eliminar el jugador');
        }
      });
    }
  }
}