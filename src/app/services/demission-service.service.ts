import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface DemandeDemission {
  id?: number;
  cin: string;
  motif: string;
  dateDemande?: string;
  statut?: 'EN_ATTENTE' | 'ACCEPTEE' | 'REFUSEE';
}

@Injectable({
  providedIn: 'root'
})
export class DemissionServiceService {

  private apiUrl = 'http://localhost:8080/api/demissions';

  constructor(private http: HttpClient) {}

  // 🔴 L’adhérent envoie sa demande
  envoyerDemande(data: DemandeDemission): Observable<any> {
    return this.http.post(`${this.apiUrl}/demander`, data);
  }

  // ✅ Admin : récupérer toutes les demandes
  getAllDemandes(): Observable<DemandeDemission[]> {
    return this.http.get<DemandeDemission[]>(`${this.apiUrl}/toutes`);
  }

  // ✅ Admin : accepter ou refuser une demande
  traiterDemande(id: number, accepter: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/traiter/${id}?accepter=${accepter}`, {});
  }
}
