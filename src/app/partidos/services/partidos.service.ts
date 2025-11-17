// services/partidos.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partido } from '../interfaces/partido.interface';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5028/api/Matches'; // Ajusta según tu backend

  getAll(): Observable<Partido[]> {
    return this.http.get<Partido[]>(this.apiUrl);
  }

  getById(id: number): Observable<Partido> {
    return this.http.get<Partido>(`${this.apiUrl}/${id}`);
  }

  create(data: Partido): Observable<Partido> {
    return this.http.post<Partido>(this.apiUrl, data);
  }

  update(id: number, data: Partido): Observable<Partido> {
    return this.http.put<Partido>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}