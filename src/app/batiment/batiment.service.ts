
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BatimentService {

  private apiUrl = 'http://localhost:8080/batiment'; // Remplacez par votre URL de backend

  constructor(private http: HttpClient) { }

  // Méthode pour obtenir les informations du bâtiment par nom d'arrondissement avec gestion d'erreur améliorée
  getBatimentsByNomArrondissement(nomArrondissement: string): Observable<any> {
    const encodedArrondissement = encodeURIComponent(nomArrondissement);
    return this.http.get<any>(`${this.apiUrl}/arrondissement/${encodedArrondissement}`).pipe(
      catchError((error: any) => {
        console.error(`Erreur lors de la récupération des bâtiments pour l'arrondissement ${nomArrondissement}:`, error);
        return throwError(() => new Error('Échec de la récupération des données. Veuillez réessayer.'));
      })
    );
  }
  
  
  
  


 // Méthode pour obtenir les informations du bâtiment par nom d'annexe avec gestion d'erreur améliorée
getBatimentsByNomAnnexe(nomAnnexe: string): Observable<any> {
  // Log the nomAnnexe to confirm what is being sent
  console.log(`Fetching buildings for annex: ${nomAnnexe}`);

  // Make the HTTP GET request
  return this.http.get<any>(`${this.apiUrl}/annexe/${nomAnnexe}`).pipe(
    // Catch any error from the HTTP request
    catchError((error: any) => {
      console.error(`Error fetching buildings for annex ${nomAnnexe}:`, error);
      // Here, you could return an empty array or a specific error message, depending on your needs
      return throwError(() => new Error('Failed to fetch building data. Please try again later.'));
    }),
    // Map response to validate data structure if necessary
    map((response: any) => {
      // You can add additional checks here to ensure response structure
      if (!Array.isArray(response)) {
        console.warn(`Unexpected response format for annex ${nomAnnexe}:`, response);
        throw new Error('Invalid data format');
      }
      return response;
    })
  );
}


// Méthode pour créer un bâtiment
createBatiment(formData: FormData): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/createBat`, formData);
}

// Méthode pour supprimer un bâtiment
deleteBatiment(idBat: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/delete/${idBat}`);
}

updateBatiment(idBat: number, updatedBatiment: any): Observable<any> {
  const url = `http://localhost:8080/batiment/update/${idBat}`;
  return this.http.put(url, updatedBatiment);
}



}
