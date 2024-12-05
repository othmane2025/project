import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ExpertiseTechnique } from './expertise.model';

@Injectable({
  providedIn: 'root'
})
export class ExpertiseService {

  private apiUrl = 'http://localhost:8080/expertise'; 

  constructor(private http: HttpClient) { }

  getExpertiseTechniquesByArrondissement(nomArrondissement: string): Observable<any[]> {
    const encodedNomArrondissement = encodeURIComponent(nomArrondissement);
    const url = `${this.apiUrl}/arrondissement/${encodedNomArrondissement}`;
    console.log('URL générée pour le backend :', url);
  
    return this.http.get<any[]>(url).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des expertises par arrondissement:', error);
        throw error;
      })
    );
  }
  

  // Dans le service Angular BatimentService
getExpertiseTechniquesByNomAnnexe(nomAnnexe: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/annexe/${nomAnnexe}`);
}

downloadFileExpertise(idBat: number): Observable<Blob> {
  const url = `${this.apiUrl}/downloadFileExpertise/${idBat}`;
  return this.http.get(url, { responseType: 'blob' });
}

// Ajouter une nouvelle expertise technique
createExpertise(data: FormData): Observable<any> {
  return this.http.post(`${this.apiUrl}/createExp`, data);
}



updateExpertise( idExp: number, updatedExpertise: any) {
  const url = `${this.apiUrl}/updateExpertise/${idExp}`;
  return this.http.put(url, updatedExpertise);
}

 // Méthode pour chercher par recommandation
 searchByRecommandation(recommandation: string): Observable<any> {
  console.log(`URL appelée: ${this.apiUrl}/searchExp avec recommandation = ${recommandation}`);
  return this.http.get<any>(`${this.apiUrl}/searchExp`, {
      params: { recommandation }
  });
}


}
