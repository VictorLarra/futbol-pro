export interface Partido {
  id: number;
  fecha: string; // o Date
  id_equipo_local: number;
  id_equipo_visitante: number;
  goles_local: number;
  goles_visitante: number;
  estadio: string;
  // Opcionales para mostrar nombres
  equipo_local_nombre?: string;
  equipo_visitante_nombre?: string;
}