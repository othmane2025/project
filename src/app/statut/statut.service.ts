import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NomAnnexe } from '../enumeration/nom-annexe';
import { Observable } from 'rxjs';
import { StatutActuelDTO } from './statut-actuel-dto.model';

@Injectable({
  providedIn: 'root'
})
export class StatutService {

  private apiUrl = 'http://localhost:8080/statut'; // Mettez à jour l'URL de base selon votre API

  constructor(private http: HttpClient) {}

  getStatutActuelsByNomAnnexe(nomAnnexe: NomAnnexe): Observable<StatutActuelDTO[]> {
    return this.http.get<StatutActuelDTO[]>(`${this.apiUrl}/annexe/${nomAnnexe}`);
  }

  createStatutActuel(idBat: number, statutData: any): Observable<any> {
    const formData = new FormData();
    formData.append('idBat', idBat.toString());
  
    if (statutData.vide) formData.append('vide', statutData.vide);
    if (statutData.vacant) formData.append('vacant', statutData.vacant);
    if (statutData.entierementDemoli) formData.append('entierementDemoli', statutData.entierementDemoli);
    if (statutData.partiellementDemoli) formData.append('partiellementDemoli', statutData.partiellementDemoli);
    if (statutData.renforce) formData.append('renforce', statutData.renforce);
    if (statutData.restaurer) formData.append('restaurer', statutData.restaurer);
  
    return this.http.post(`${this.apiUrl}/createSta`, formData, { responseType: 'text' });
  }
  

  updateStatutActuel(idStatut: number, data: any): Observable<any> {
    const url = `${this.apiUrl}/update/${idStatut}`;
    return this.http.put(url, data);
  }
  
}
