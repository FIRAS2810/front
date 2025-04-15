import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AdherentProfileDTO {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  activite: string;
  cin: string;
  dateNaissance: string;
  dateAdhesion: string;
  photoProfilBase64?: string;
}


export interface AdherentUpdateDTO {
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string; 
  email: string;
  dateNaissance: string;
  
}



@Injectable({
  providedIn: 'root'
})
export class AdherentService {

  private apiUrl = 'http://localhost:8080/api/adherents';

  constructor(private http: HttpClient) {}

  getMonProfil(email: string): Observable<AdherentProfileDTO> {
    return  this.http.get<AdherentProfileDTO>(`${this.apiUrl}/profil/${email}`);
  }

  updateProfilAdherent(email: string, data: AdherentUpdateDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-profil/${email}`, data, { responseType: 'text' });
  }
  
  
  
}
