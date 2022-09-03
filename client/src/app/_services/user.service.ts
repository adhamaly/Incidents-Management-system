import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const API_URL = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + `users/incidents`, {
      headers: { Authorization: `Bearer ${this.storageService.getToken()}` },
    });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admins/incidents', {
      headers: { Authorization: `Bearer ${this.storageService.getToken()}` },
    });
  }
}
