import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva, ReservaDelete, ReservaHuesped, ReservaHuesped2 } from '../interfaces/reserva.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  public URL: string = 'http://localhost:8080/reservas/hotel/alura';

  constructor(
    private http: HttpClient
  ) { }

  postReservasion(reserva: Reserva): Observable<Reserva>{
    return this.http.post<Reserva>(`${this.URL}/guardarReserva`, reserva);
  }

  getReservas(): Observable<Reserva[]>{
    return this.http.get<Reserva[]>(`${this.URL}/reservas`);
  }

  getReservas2(): Observable<ReservaHuesped[]>{
    return this.http.get<ReservaHuesped[]>(`${this.URL}/reservas`);
  }

  getReservaId(id: number): Observable<Reserva>{
    return this.http.get<Reserva>(`${this.URL}/reserva/${id}`);
  }

  getReservaId2(id: number): Observable<ReservaHuesped>{
    return this.http.get<ReservaHuesped>(`${this.URL}/reserva/${id}`);
  }

  deleteReserva(id: number): Observable<ReservaDelete>{
    return this.http.delete<ReservaDelete>(`${this.URL}/delete/reserva/${id}`);
  }

  editarReserva(id: number, reserva: Reserva): Observable<ReservaHuesped2>{
    return this.http.put<ReservaHuesped2>(`${this.URL}/modificar/reserva/${id}`,reserva);
  }
}
