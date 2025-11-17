// services/jugadores.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jugador } from '../interfaces/jugador.interface';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5028/api/Players'; // 

  getAll(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(this.apiUrl);
  }

  getById(id: number): Observable<Jugador> {
    return this.http.get<Jugador>(`${this.apiUrl}/${id}`);
  }

  create(data: Jugador): Observable<Jugador> {
    return this.http.post<Jugador>(this.apiUrl, data);
  }

  update(id: number, data: Jugador): Observable<Jugador> {
    return this.http.put<Jugador>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Si necesitas jugadores por equipo
  getByEquipo(equipoId: number): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(`${this.apiUrl}/equipo/${equipoId}`);
  }
}