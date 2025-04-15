import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeAdhesionService {

  private apiUrl = 'http://localhost:8080/api/demandes';

  constructor(private http: HttpClient) {}

  // 👉 Soumettre la demande d’adhésion avec formulaire + fichier
  soumettreDemande(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/soumettre`, formData);
  }

  
}
