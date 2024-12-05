import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Arrondissement } from './arrondissement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArrondissmentService {

  private apiUrl = 'http://localhost:8080/arrondissement'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient) { }

  // Exemple de méthode setAnnexe pour créer ou mettre à jour une annexe
  setArrondissement(arrondissement: Arrondissement): Observable<Arrondissement> {
    return this.http.post<Arrondissement>(`${this.apiUrl}/getArr`, arrondissement);
  }

  // Autres méthodes éventuelles pour récupérer des annexes
  getArrondissement(): Observable<Arrondissement[]> {
    return this.http.get<Arrondissement[]>(`${this.apiUrl}/all`);
  }
}
