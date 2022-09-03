import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, pipe } from 'rxjs';

const AUTH_API = 'http://localhost:3000/api/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(userName: string) {
    const result = this.http.post(
      `${AUTH_API}/login`,
      {
        userName,
      },
      httpOptions
    );

    console.log('----------');
    console.log(result);

    return result;
  }
}
