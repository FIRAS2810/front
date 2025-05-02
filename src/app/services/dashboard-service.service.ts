import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DashboardStatsDTO {
  chiffreAffaires: number;
  resteCotisation: number;
  nbAdherents: number;
  valeurPart: number;
  nbAdhesions: number;
  nbHommes: number;
  nbFemmes: number;
  nbMoins30: number;
  nbEntre30et50: number;
  nbPlus50: number;
  totalCA: number;
  
  croissancePourcent: number;
  previsionCA: number;
  nombreActionsTransferees: number;
  nombreActionsVendues: number;

   nbDemandesValidees: number;
  nbDemandesRefusees: number;
  nbDemandesEnAttente: number;
  caActuel : number;
  caPrecedent :number;

}


@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  private apiUrl = 'http://localhost:8080/api/dashboard'; // ton endpoint backend

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<DashboardStatsDTO> {
    return this.http.get<DashboardStatsDTO>(`${this.apiUrl}/stats`);
  }
}
