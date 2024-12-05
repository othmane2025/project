import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  listFiles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/batiment/listFiles`);
  }
}
