import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NouveauteDTO {
  id: number;
  titre: string;
  description: string;
  datePublication: string;
  nomFichier: string;
  typeFichier: string;
  fichierBase64: string;
}

@Injectable({
  providedIn: 'root'
})
export class NouveauteService {

  private API = 'http://localhost:8080/api/nouveautes'; // Ton endpoint backend

  constructor(private http: HttpClient) { }

  getAllNouveautes(): Observable<NouveauteDTO[]> {
    return this.http.get<NouveauteDTO[]>(`${this.API}/toutes`);
  }

  addNouveaute(formData: FormData): Observable<any> {
    return this.http.post(`${this.API}/ajouter`, formData, { responseType: 'text' });
  }

  deleteNouveaute(id: number): Observable<any> {
    return this.http.delete(`${this.API}/supprimer/${id}`, { responseType: 'text' });
  }
  

  updateNouveaute(id: number, data: FormData): Observable<any> {
    return this.http.put(`${this.API}/modifier/${id}`, data, { responseType: 'text' });
  }
  
}
