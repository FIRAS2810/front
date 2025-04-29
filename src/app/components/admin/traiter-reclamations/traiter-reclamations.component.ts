import { Component, OnInit } from '@angular/core';
import { ReclamationServiceService } from '../../../services/reclamation-service.service';

interface Reclamation {
  id: number;
  cin: string;
  motif: string;
  dateReclamation: string;
  statut: 'EN_ATTENTE' | 'ACCEPTEE' | 'REFUSEE';
}


@Component({
  selector: 'app-traiter-reclamations',
  templateUrl: './traiter-reclamations.component.html',
  styleUrl: './traiter-reclamations.component.css'
})
export class TraiterReclamationsComponent implements OnInit {
  reclamations: Reclamation[] = [];

  constructor(private reclamationService: ReclamationServiceService) {}

  ngOnInit(): void {
    this.chargerReclamations();
  }

  chargerReclamations(): void {
    this.reclamationService.getAllReclamations().subscribe(data => {
      this.reclamations = data;
    });
  }

  traiter(id: number, accepter: boolean): void {
    this.reclamationService.traiterReclamation(id, accepter).subscribe(() => {
      this.chargerReclamations(); // 🔁 recharge la liste
    });
  }

  joursRestants(dateReclamation: string): number {
    const date = new Date(dateReclamation);
    const now = new Date();
    const diff = 14 - Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
    return diff > 0 ? diff : 0;
  }

  badgeColor(statut: string): string {
    switch (statut) {
      case 'EN_ATTENTE': return 'badge badge-warning';
      case 'ACCEPTEE': return 'badge badge-success';
      case 'REFUSEE': return 'badge badge-danger';
      default: return '';
    }
  }
}
