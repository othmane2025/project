import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Decision } from './decision.model';

@Injectable({
  providedIn: 'root'
})
export class DecisionService {

  private apiUrl = 'http://localhost:8080/decision'; 

  constructor(private http: HttpClient) { }

  getDecisionCollectivesByArrondissement(nomArrondissement: string): Observable<any[]> {
    // Encoder le nom de l'arrondissement pour l'URL
    const encodedNomArrondissement = encodeURIComponent(nomArrondissement);
    // Construire l'URL pour l'API
    const url = `${this.apiUrl}/arrondissement/${encodedNomArrondissement}`;
    console.log('URL générée pour le backend :', url);
    // Effectuer une requête HTTP GET et gérer les erreurs
    return this.http.get<any[]>(url).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des décisions collectives par arrondissement:', error);
        // Relancer l'erreur pour qu'elle puisse être gérée ailleurs
        throw error;
      })
    );
  }
  
  getDecisionCollectivesByNomAnnexe(nomAnnexe: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/annexe/${nomAnnexe}`);
  }



  searchByRecommandationDecision(recommandationDecision: string): Observable<any[]> {
    const encodedRecommandation = encodeURIComponent(recommandationDecision);
    return this.http.get<any[]>(`${this.apiUrl}/searchDecision?recommandationDecision=${encodedRecommandation}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la recherche des décisions collectives:', error);
        return throwError(() => new Error('Erreur lors de la récupération des données. Veuillez réessayer.'));
      })
    );
  }
  

  // Méthode pour télécharger le fichier de décision associé à un bâtiment
  downloadFileDecision(idBat: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/downloadFileDecision/${idBat}`, { responseType: 'blob' });
  }

  addDecisionCollective(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/createDec`, data);
  }

  // Méthode pour mettre à jour une DecisionCollective
  updateDecision(idDec: number, updatedData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateDecision/${idDec}`, updatedData);
}


}
