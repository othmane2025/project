import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { NomArrondissement } from '../enumeration/nom-arrondissement';
import { AppercuRapport } from './AppercuRapport.model';

@Injectable({
  providedIn: 'root'
})
export class AppercuService {

  private apiUrl = 'http://localhost:8080/appercu'; // Remplacez par votre URL de backend

  constructor(private http: HttpClient) { }

  // Dans le service Angular BatimentService
getAppercuRapportsByNomAnnexe(nomAnnexe: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/annexe/${nomAnnexe}`);
}



getAdresseById(idBat: number) {
  return this.http.get<{ adresse: string }>(`${this.apiUrl}/adresse/${idBat}`);
}

getAppercuRapportsByArrondissement(nomArrondissement: string): Observable<AppercuRapport[]> {
  const encodedArrondissement = encodeURIComponent(nomArrondissement); // Encodage de l'arrondissement
  return this.http.get<AppercuRapport[]>(`${this.apiUrl}/arrondissement/${encodedArrondissement}`).pipe(
    catchError((error) => {
      console.error(`Erreur lors de la récupération des rapports pour l'arrondissement ${nomArrondissement}:`, error);
      return throwError(() => new Error('Échec de la récupération des rapports.'));
    })
  );
}



createAppercuRapport(idBat: number, appercuData: any, file?: File): Observable<any> {
  const formData = new FormData();

  // Toujours ajouter l'ID du bâtiment
  formData.append('idBat', idBat.toString());

  // Ajouter les champs optionnels uniquement s'ils ne sont pas null ou undefined
  if (appercuData.nbRecommandation !== undefined && appercuData.nbRecommandation !== null) {
    formData.append('nbRecommandation', appercuData.nbRecommandation.toString());
  }
  if (appercuData.dateInspection) {
    formData.append('dateInspection', appercuData.dateInspection);
  }
  if (appercuData.recommandation) {
    formData.append('recommandation', appercuData.recommandation);
  }
  if (appercuData.nbNotificationRapportInspection !== undefined && appercuData.nbNotificationRapportInspection !== null) {
    formData.append('nbNotificationRapportInspection', appercuData.nbNotificationRapportInspection.toString());
  }
  if (appercuData.dateNotification) {
    formData.append('dateNotification', appercuData.dateNotification);
  }
  // Ajouter le fichier uniquement s'il est fourni
  if (file) {
    formData.append('filerapportInspection', file);
  }
  // Envoyer la requête POST
  return this.http.post(`${this.apiUrl}/createApp`, formData);
}


updateAppercuRapport(idApp: number, updatedData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/updateApp/${idApp}`, updatedData);
}



}
