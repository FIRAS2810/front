import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdherentService } from '../../../services/adherent.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-compte-attente',
  templateUrl: './admin-compte-attente.component.html',
  styleUrls: ['./admin-compte-attente.component.css']
})
export class AdminCompteAttenteComponent implements OnInit {
  comptesAttente: any[] = [];
  selectedAdherent: any;
  private apiUrl = 'http://localhost:8080/api/compte-attente'; 

  constructor(private http: HttpClient, private adherentService: AdherentService) {}

  ngOnInit(): void {
    this.chargerComptesAttente();
  }

  chargerComptesAttente(): void {
    // Charger les comptes en attente depuis l'API
    this.http.get<any[]>(`${this.apiUrl}/tous`).subscribe(data => {
      this.comptesAttente = data;
      this.comptesAttente.forEach(compte => {
        this.adherentService.getMonProfil(compte.cinAdherent).subscribe({
          next: (data) => {
            compte.details = data;  // Ajouter les détails à chaque objet compte
          },
          error: (err) => {
            Swal.fire('❌ Erreur', 'Impossible de récupérer les détails de l\'adhérent.', 'error');
          }
        });
      });
    });
  }

  marquerCommeRegle(id: number): void {
    this.http.patch(`${this.apiUrl}/regler/${id}`, {}).subscribe({
      next: () => {
        Swal.fire('✅ Réglé', 'Le compte a été marqué comme réglé.', 'success');
        this.chargerComptesAttente(); // Recharge la liste pour voir les mises à jour
      },
      error: () => {
        Swal.fire('❌ Erreur', 'Une erreur est survenue.', 'error');
      }
    });
  }
}
