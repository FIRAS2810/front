import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CotisationServiceService } from '../../../services/cotisation-service.service';

@Component({
  selector: 'app-historique-cotisation',
  templateUrl: './historique-cotisation.component.html',
  styleUrls: ['./historique-cotisation.component.css']
})
export class HistoriqueCotisationComponent implements OnInit {
  historique: any[] = [];
  emailAdherent!: string;

  constructor(private cotisationService: CotisationServiceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('HistoriqueCotisationComponent chargé');
    this.emailAdherent = localStorage.getItem('email')!;
    console.log('📩 Email récupéré depuis localStorage :', this.emailAdherent);
  
    this.loadHistorique();
  }
  
  

  loadHistorique() {
    this.cotisationService.getCotisationsByEmail(this.emailAdherent).subscribe({
      next: (data) => {
        console.log("Cotisations reçues :", data);
        this.historique = data;
      },
      error: (err) => {
        console.error('Erreur de chargement des cotisations', err);
      }
    });
    
  }


  getTotalMontant(): number {
    return this.historique.reduce((sum, c) => sum + c.montantVerse, 0);
  }
  
  getTotalActions(): number {
    return this.historique.reduce((sum, c) => sum + c.nombreActions, 0);
  }
  
  
}
