// interfaces/jugador.interface.ts
export interface Jugador {
  id: number;
  nombre: string;
  posicion: string;
  edad: number;
  id_equipo: number | null;
  equipo?: string; // opcional para mostrar nombre del equipo
}