import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RaisonInobservationDTO } from './raison-observation-dto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RaisonService {

  private apiUrl = 'http://localhost:8080/raison';

  constructor(private http: HttpClient) {}

  getRaisonsByNomAnnexe(nomAnnexe: string): Observable<RaisonInobservationDTO[]> {
    return this.http.get<RaisonInobservationDTO[]>(`${this.apiUrl}/annexe/${nomAnnexe}`);
  }

   // Ajouter une nouvelle RaisonInobservation
   addRaisonInobservation(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/createRai`, formData);
  }

  updateRaisonInobservation(idRaison: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${idRaison}`, data);
  }
  

}
