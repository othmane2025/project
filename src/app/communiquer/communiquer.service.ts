import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommuniquerDecisionDTO } from './communiquer-decision-dto.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommuniquerService {

  private apiUrl = 'http://localhost:8080/communiquer'; 

  constructor(private http: HttpClient) { }

  getCommuniquerDecisionsByArrondissement(nomArrondissement: string): Observable<any[]> {
    // Encoder le nom d'arrondissement pour l'URL
    const encodedNomArrondissement = encodeURIComponent(nomArrondissement);
    // Construire l'URL de l'API
    const url = `${this.apiUrl}/arrondissement/${encodedNomArrondissement}`;
    console.log('URL générée pour le backend :', url);
    // Effectuer une requête GET pour récupérer les données
    return this.http.get<any[]>(url).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des CommuniquerDecision par arrondissement:', error);
        return throwError(() => new Error('Erreur lors du chargement des CommuniquerDecision'));
      })
    );
  }
  

  getCommuniquerDecisionsByNomAnnexe(nomAnnexe: string): Observable<CommuniquerDecisionDTO[]> {
    return this.http.get<CommuniquerDecisionDTO[]>(`${this.apiUrl}/annexe/${nomAnnexe}`);
  }

  addCommuniquerDecision(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/createCom`, data);
  }

  updateCommuniquerDecision(idCom: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${idCom}`, data);
  }
}
