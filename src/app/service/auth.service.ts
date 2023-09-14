import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public URL: string = 'http://localhost:8080/auth';

  constructor(
    private http: HttpClient
  ) { }

  postAuth(auth: Auth){
    return this.http.post(this.URL, auth);
  }
}
