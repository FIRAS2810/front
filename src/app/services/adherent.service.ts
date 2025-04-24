import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BilanCotisationDTO } from '../components/admin/adherents/adherents.component';

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

export interface AdherentTableDTO {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  cin: string;
  tel: string;
  sexe: string;
  etat: string;
  dateAdhesion: string;
  dateFin: string;
  montant: number;
  nbActions: number;
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

  private apiUrlCotisation = 'http://localhost:8080/api/cotisations';


  constructor(private http: HttpClient) {}

  getMonProfil(email: string): Observable<AdherentProfileDTO> {
    return  this.http.get<AdherentProfileDTO>(`${this.apiUrl}/profil/${email}`);
  }

  updateProfilAdherent(email: string, data: AdherentUpdateDTO): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-profil/${email}`, data, { responseType: 'text' });
  }
  
  getAllAdherents(): Observable<AdherentTableDTO[]> {
    return this.http.get<AdherentTableDTO[]>(`${this.apiUrl}/tous`);
  }
  
  getBilanCotisation(cin: string): Observable<BilanCotisationDTO> {
    return this.http.get<BilanCotisationDTO>(`${this.apiUrlCotisation}/etat-financier/${cin}`);
  }
  
  
  updatePhoto(cin: string, formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/update-photo/${cin}`, formData, {
      responseType: 'text' as 'json'
    });
  }
  
  

  
}
