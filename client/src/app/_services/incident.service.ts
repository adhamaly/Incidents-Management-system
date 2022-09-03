import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from '../models/incident.model';
import { StorageService } from './storage.service';

const baseUrl = 'http://localhost:3000/api/incidents/';

@Injectable({
  providedIn: 'root',
})
export class IncidentSerevice {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data, {
      headers: { Authorization: `Bearer ${this.storageService.getToken()}` },
    });
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
