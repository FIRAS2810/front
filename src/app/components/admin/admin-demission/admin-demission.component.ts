import { Component, OnInit } from '@angular/core';
import { DemissionServiceService } from '../../../services/demission-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-demission',
  templateUrl: './admin-demission.component.html',
  styleUrl: './admin-demission.component.css'
})
export class AdminDemissionComponent implements OnInit {
  demandes: any[] = [];

  constructor(private demissionService: DemissionServiceService) {}

  ngOnInit(): void {
    this.chargerDemandes();
  }

  chargerDemandes(): void {
    this.demissionService.getAllDemandes().subscribe(data => {
      this.demandes = data;
    });
  }

  traiterDemande(id: number, accepter: boolean): void {
    Swal.fire({
      title: 'Confirmer',
      text: accepter ? 'Accepter cette démission ?' : 'Refuser cette démission ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: accepter ? 'Oui, accepter' : 'Oui, refuser',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.demissionService.traiterDemande(id, accepter).subscribe({
          next: () => {
            Swal.fire('Succès', 'La demande a été traitée.', 'success');
            this.chargerDemandes(); // recharge la liste
          },
          error: () => {
            Swal.fire('Erreur', 'Une erreur est survenue', 'error');
          }
        });
      }
    });
  }

  badgeColor(statut: string): string {
    switch (statut) {
      case 'EN_ATTENTE': return 'badge-warning';
      case 'ACCEPTEE': return 'badge-success';
      case 'REFUSEE': return 'badge-danger';
      default: return '';
    }
  }

}
