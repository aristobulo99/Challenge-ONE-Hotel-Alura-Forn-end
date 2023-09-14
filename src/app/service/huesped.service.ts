import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Huesped, HuespedDelete, RegistroHUesped } from '../interfaces/huesped.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HuespedService {

  public URL: string = 'http://localhost:8080/huespedes';

  constructor(
    private http: HttpClient
  ) { }

  getHuespedes(): Observable<Huesped[]>{
    return this.http.get<Huesped[]>(`${this.URL}/huespedes`);
  }

  getHuespedId(id: string): Observable<Huesped>{
    return this.http.get<Huesped>(`${this.URL}/huesped/${id}`);
  }

  postHuesped(huesped: RegistroHUesped): Observable<RegistroHUesped>{
    return this.http.post<RegistroHUesped>(`${this.URL}/añadir/huesped`, huesped);
  }

  deleteHuesped(id: number): Observable<HuespedDelete>{
    return this.http.delete<HuespedDelete>(`${this.URL}/delete/huesped/${id}`);
  }

  updateHuesped(id: number, huesped: RegistroHUesped): Observable<Huesped>{
    return this.http.put<Huesped>(`${this.URL}/modificar/huesped/${id}`, huesped);
  }
}
