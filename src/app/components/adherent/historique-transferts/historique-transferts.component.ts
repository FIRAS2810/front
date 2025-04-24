import { Component, OnInit } from '@angular/core';
import { TransfertServiceService } from '../../../services/transfert-service.service';
import { AdherentService } from '../../../services/adherent.service';  // Utilisation du service AdherentService
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-historique-transferts',
  templateUrl: './historique-transferts.component.html',
  styleUrls: ['./historique-transferts.component.css']
})
export class HistoriqueTransfertsComponent implements OnInit {
  transferts: any[] = [];  // Liste des transferts
  transfertsPage: any[] = [];  // Transferts affichés pour la page actuelle
  monCin: string = '';
  nomUtilisateur: string = ''; // Stocke le nom complet de l'adhérent

  rowsPerPage = 5;  // Nombre de lignes par page
  currentPage: number = 0;   // Page actuelle

  constructor(
    private transfertService: TransfertServiceService,
    private adherentService: AdherentService
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');

    if (email) {
      this.adherentService.getMonProfil(email).subscribe(profil => {
        this.monCin = profil.cin;
        this.nomUtilisateur = profil.nom + ' ' + profil.prenom; // Stocke le nom complet de l'adhérent
        console.log("Nom adhérent connecté:", this.nomUtilisateur);

        this.transfertService.getHistoriqueAdherent(this.monCin).subscribe(data => {
          this.transferts = data;
          console.log("Transferts récupérés:", this.transferts);
          this.paginer();  // Applique la pagination
        });
      });
    }
  }

  changerPage(event: PaginatorState) {
    console.log("📦 Page changée :", event);
    this.currentPage = event.page ?? 0;  // Si `event.page` est null, on le remplace par 0
    this.rowsPerPage = event.rows ?? 5;  // Si `event.rows` est null, on le remplace par 5
    this.paginer();  // Met à jour la liste des transferts affichés
  }

  paginer(): void {
    const start = this.currentPage * this.rowsPerPage;  // Calcul de l'index de début
    const end = start + this.rowsPerPage;  // Calcul de l'index de fin
    console.log(`🎯 Affichage des transferts de l'index ${start} à ${end}`);
    this.transfertsPage = this.transferts.slice(start, end);  // Mise à jour des transferts affichés
  }
}
