import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface DemandeDTO {
  id: number;
  cinPersonne: string;
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  ville: string;
  activite: string;
  dateDemande: string;
  dateDecision?: string;
  justificatifBase64?: string;
  etat: string;
  sexe?: string;
  showDropdown?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class DemandeServiceService {

  private baseUrl = 'http://localhost:8080/api/demandes';

  constructor(private http: HttpClient) {}

  getAllDemandes(): Observable<DemandeDTO[]> {
    return this.http.get<DemandeDTO[]>(`${this.baseUrl}/toutes`);
  }

  demandeExiste(cin: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/existe/${cin}`);
  }

  changerStatut(id: number, etat: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/statut`, null, {
      params: { etat }
    });
  }

  soumettreDemande(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/soumettre`, formData);
  }


  getNombreDemandesEnAttente(): Observable<number> {
    return this.http.get<number>('http://localhost:8080/api/demandes/en-attente/count');
  }

  changerStatutDemande(id: number, etat: 'ACCEPTEE' | 'REFUSEE') {
    return this.http.patch(`http://localhost:8080/api/demandes/${id}/statut?etat=${etat}`, {});
  }
  
  
}
