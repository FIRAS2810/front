import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Parametrage {
  id: number;
  montantMinimalAdhesion: number;
  valeurAction: number;
  nbActionsMinimales: number;
}

export interface HistoriqueParametrage {
  id: number;
  montantMinimalAdhesion: number;
  valeurAction: number;
  nbActionsMinimales: number;
  dateModification: string;
}


@Injectable({
  providedIn: 'root'
})
export class ParametrageServiceService {

  private apiUrl = 'http://localhost:8080/api/parametrage';

  constructor(private http: HttpClient) {}

  getParametrage(): Observable<Parametrage> {
    return this.http.get<Parametrage>(`${this.apiUrl}`);
  }

  updateParametrage(id: number, data: Parametrage): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  getHistoriqueParametrage(): Observable<HistoriqueParametrage[]> {
    return this.http.get<HistoriqueParametrage[]>(`${this.apiUrl}/historique`);
  }
}
