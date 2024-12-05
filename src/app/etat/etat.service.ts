import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NomAnnexe } from '../enumeration/nom-annexe';
import { catchError, Observable, throwError } from 'rxjs';
import { EtatAvancementDTO } from './etat-avancement-dto.model';

@Injectable({
  providedIn: 'root'
})
export class EtatService {

  private apiUrl = 'http://localhost:8080/etat';

  constructor(private http: HttpClient) {}

  getEtatAvancementsByArrondissement(nomArrondissement: string): Observable<any[]> {
    const encodedNomArrondissement = encodeURIComponent(nomArrondissement);
    const url = `${this.apiUrl}/arrondissement/${encodedNomArrondissement}`;
    console.log('URL générée pour le backend :', url);
    return this.http.get<any[]>(url).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des états d\'avancement par arrondissement:', error);
        return throwError(() => new Error('Erreur lors du chargement des états d\'avancement'));
      })
    );
  }
  

  getEtatAvancementByNomAnnexe(nomAnnexe: NomAnnexe): Observable<EtatAvancementDTO[]> {
    return this.http.get<EtatAvancementDTO[]>(`${this.apiUrl}/annexe/${nomAnnexe}`);
  }

  addEtatAvancement(etatAvancement: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createEta`, etatAvancement);
  }
  
  updateEtatAvancement(id: number, etatData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, etatData);
  }
  
  
}
