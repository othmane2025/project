import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RelogementDTO } from './relogement-dto.model';
import { NomAnnexe } from '../enumeration/nom-annexe';

@Injectable({
  providedIn: 'root'
})
export class RelogementService {

  private apiUrl = 'http://localhost:8080/relogement';

  constructor(private http: HttpClient) {}

  getRelogementsByArrondissement(nomArrondissement: string): Observable<any[]> {
    // Encoder le nom d'arrondissement pour l'URL
    const encodedNomArrondissement = encodeURIComponent(nomArrondissement);

    // Construire l'URL de l'API
    const url = `${this.apiUrl}/arrondissement/${encodedNomArrondissement}`;
    console.log('URL générée pour le backend :', url);

    // Effectuer une requête GET pour récupérer les données
    return this.http.get<any[]>(url).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des relogements par arrondissement:', error);
        return throwError(() => new Error('Erreur lors du chargement des relogements'));
      })
    );
  }
  

  getRelogementsByNomAnnexe(nomAnnexe: NomAnnexe): Observable<RelogementDTO[]> {
    return this.http.get<RelogementDTO[]>(`${this.apiUrl}/annexe/${nomAnnexe}`);
  }

  downloadFileRelogement(idBat: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/downloadFileRelogement/${idBat}`, { responseType: 'blob' });
  }

  addRelogement(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/createRel`, formData);
  }

 // Méthode pour mettre à jour un Relogement
updateRelogement(idRel: number, updatedData: FormData): Observable<any> {
  return this.http.put(`${this.apiUrl}/updateRelogement/${idRel}`, updatedData);
}

  
}
