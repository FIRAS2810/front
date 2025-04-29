import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TransfertActionRequestDTO {
  cinVendeur: string;
  cinAcheteur: string;
  nombreActions: number;
  commentaire: string;
}

export interface TransfertActionResponseDTO {
  id: number;
  nombreActions: number;
  commentaire: string;
  dateTransfert: string; // ou Date si tu la transformes
  statut: string;
  vendeurNom: string;
  acheteurNom: string;
  cinAcheteur: string;
  cinVendeur: string;
  statutVendeur: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransfertServiceService {

  private API = 'http://localhost:8080/api/transferts';
 

  constructor(private http: HttpClient) {}

  demanderTransfert(data: TransfertActionRequestDTO): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.API}/demander`, data, { headers });
  }

  getHistorique(cin: string): Observable<any> {
    return this.http.get(`${this.API}/historique/${cin}`);
  }

  
  getTousTransferts(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/transferts/tous`);
  }
  
  validerTransfert(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.patch(`http://localhost:8080/api/transferts/${id}/valider`, {}, { headers });
  }
  
  refuserTransfert(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.patch(`http://localhost:8080/api/transferts/${id}/refuser`, {}, { headers });
  }

  getTousTransfertsAvecNoms(): Observable<TransfertActionResponseDTO[]> {
    return this.http.get<TransfertActionResponseDTO[]>(`http://localhost:8080/api/transferts/tous-avec-noms`);
  }
  

  getHistoriqueAdherent(cin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/transferts-adherent/${cin}`);
  }
  
  getTousPourAdmin(): Observable<TransfertActionResponseDTO[]> {
    return this.http.get<TransfertActionResponseDTO[]>(`${this.API}/admin/tous`);
  }
  
  
  accepterParVendeur(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.patch(`${this.API}/${id}/accepter-par-vendeur`, {}, { headers });
  }
  
  refuserParVendeur(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.patch(`${this.API}/${id}/refuser-par-vendeur`, {}, { headers });
  }
  
  
  
  
  
  
  
}
