import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationServiceService {

  private apiUrl = 'http://localhost:8080/api/reclamations'; // 🛠️ à adapter si besoin

  constructor(private http: HttpClient) {}

  /**
   * Soumettre une nouvelle réclamation au backend
   * @param reclamationData données du formulaire {cin, motif, dateReclamation}
   */
  submitReclamation(reclamationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/soumettre`, reclamationData);
  }
  
  getAllReclamations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/toutes`);
  }
  
  traiterReclamation(id: number, accepter: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/traiter/${id}?accepter=${accepter}`, {});
  }
}
