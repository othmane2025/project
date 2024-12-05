import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Annexe } from './annexe.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnexeService {

  private apiUrl = 'http://localhost:8080/annexe'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient) { }

  // Exemple de méthode setAnnexe pour créer ou mettre à jour une annexe
  setAnnexe(annexe: Annexe): Observable<Annexe> {
    return this.http.post<Annexe>(`${this.apiUrl}/getAnn`, annexe);
  }

  // Autres méthodes éventuelles pour récupérer des annexes
  getAnnexes(): Observable<Annexe[]> {
    return this.http.get<Annexe[]>(`${this.apiUrl}/all`);
  }

  getAnnexesByArrondissement(arrondissementId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/arrondissement/${arrondissementId}`);
  }
}
