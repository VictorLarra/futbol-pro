// partidos/listar/listar.component.ts
import { Component, OnInit } from '@angular/core';
import { PartidosService } from '../services/partidos.service';
import { EquiposService } from '../../equipos/services/equipos.service'; // 👈 Importa esto
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Partido } from '../interfaces/partido.interface';
import { Equipo } from '../../equipos/interfaces/equipo.interface';

@Component({
  selector: 'app-listar-partidos',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterLink]
})
export class ListarPartidosComponent implements OnInit {
  
  partidos: Partido[] = [];
  equipos: Equipo[] = []; // 👈 Lista de equipos
  loading: boolean = false;
  error: string = '';

  constructor(
    private partidosService: PartidosService,
    private equiposService: EquiposService // 👈 Inyecta el servicio
  ) {}

  ngOnInit(): void {
    this.cargarEquiposYPartidos();
  }

  cargarEquiposYPartidos() {
    this.loading = true;
    
    // Primero cargar equipos, luego partidos
    this.equiposService.getAll().subscribe({
      next: (equiposData) => {
        this.equipos = equiposData;
        this.cargarPartidos();
      },
      error: (error) => {
        console.error('Error al cargar equipos', error);
        this.loading = false;
      }
    });
  }

  cargarPartidos() {
    this.partidosService.getAll().subscribe({
      next: (data: Partido[]) => {
        this.partidos = this.mapearNombresEquipos(data);
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error al obtener partidos', error);
        this.error = 'Error al cargar los partidos';
        this.loading = false;
      }
    });
  }

  // Método para mapear IDs a nombres de equipos
  mapearNombresEquipos(partidos: Partido[]): Partido[] {
    return partidos.map(partido => {
      const equipoLocal = this.equipos.find(e => e.id === partido.id_equipo_local);
      const equipoVisitante = this.equipos.find(e => e.id === partido.id_equipo_visitante);
      
      return {
        ...partido,
        equipo_local_nombre: equipoLocal?.nombre || `Equipo ${partido.id_equipo_local}`,
        equipo_visitante_nombre: equipoVisitante?.nombre || `Equipo ${partido.id_equipo_visitante}`
      };
    });
  }

  obtenerNombreEquipo(id: number): string {
    const equipo = this.equipos.find(e => e.id === id);
    return equipo ? equipo.nombre : `Equipo ${id}`;
  }

  eliminarPartido(id: number) {
    if (confirm('¿Seguro que deseas eliminar este partido?')) {
      this.partidosService.delete(id).subscribe({
        next: () => {
          this.partidos = this.partidos.filter(p => p.id !== id);
        },
        error: (error: any) => {
          console.error('Error al eliminar partido', error);
          alert('Error al eliminar el partido');
        }
      });
    }
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES');
  }
}