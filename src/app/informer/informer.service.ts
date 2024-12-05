import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NomAnnexe } from '../enumeration/nom-annexe';
import { InformerARDTO } from './informer-ar-dto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformerService {

  private apiUrl = 'http://localhost:8080/informer';

  constructor(private http: HttpClient) {}

    // Méthode pour récupérer les données d'InformerAR par nomAnnexe
    getInformerARByNomAnnexe(nomAnnexe: NomAnnexe): Observable<InformerARDTO[]> {
      return this.http.get<InformerARDTO[]>(`${this.apiUrl}/annexe/${nomAnnexe}`);
    }

    addInformerAr(informerArData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/createInf`, informerArData);
    }

    updateInformerAR(idAR: number, informerAR: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/update/${idAR}`, informerAR);
    }
    
}
