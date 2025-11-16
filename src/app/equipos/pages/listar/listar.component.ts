import { Component, OnInit } from '@angular/core';
import { EquiposService } from '../../services/equipos.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Equipo } from '../../interfaces/equipo.interface';

@Component({
  selector: 'app-listar-equipos',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
})
export class ListarEquiposComponent implements OnInit {
  

  equipos: any[] = [];

  constructor(private equiposService: EquiposService) {}

  ngOnInit(): void {
    this.obtenerEquipos();
  }

  obtenerEquipos() {
    this.equiposService.getAll().subscribe({
      next: (data: any) => {
        this.equipos = data;
      },
      error: (error: any) => {
        console.error('Error al obtener equipos', error);
      }
    });
  }

  eliminarEquipo(id: number) {
    if (confirm('¿Seguro que deseas eliminar este equipo?')) {
      this.equiposService.delete(id).subscribe({
        next: () => {
          this.equipos = this.equipos.filter(e => e.id !== id);
        },
        error: (error) => {
          console.error('Error al eliminar equipo', error);
        }
      });
    }
  }

}
