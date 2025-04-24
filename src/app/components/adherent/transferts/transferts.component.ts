import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TransfertActionRequestDTO, TransfertServiceService } from '../../../services/transfert-service.service';
import { AdherentService, AdherentTableDTO } from '../../../services/adherent.service';
import { AuthService } from '../../../services/auth.service';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-transferts',
  templateUrl: './transferts.component.html',
  styleUrls: ['./transferts.component.css']
})
export class TransfertsComponent implements OnInit {

  email: string = '';
  monCin: string = '';
  adherents: AdherentTableDTO[] = [];
  adherentsAffiches: AdherentTableDTO[] = [];

  showModal = false;
  recepteurCin: string = '';
  nombreActions: number = 1;
  commentaire: string = '';

  // Pagination
  rowsPerPage = 5;
  currentPage = 0;

  constructor(
    private authService: AuthService,
    private adherentService: AdherentService,
    private transfertService: TransfertServiceService
  ) {}

  ngOnInit(): void {
    this.email = this.authService.getEmailFromToken()!;
    this.adherentService.getMonProfil(this.email).subscribe(profil => {
      this.monCin = profil.cin;
      this.adherentService.getAllAdherents().subscribe(all => {
        this.adherents = all.filter(a => a.cin !== this.monCin);
        this.paginer(); // ✅ afficher la première page
      });
    });
  }

  changerPage(event: PaginatorState) {
    console.log("📦 Page changée :", event);
    this.currentPage = event.page ?? 0;
    this.rowsPerPage = event.rows ?? 5;
    this.paginer();
  }

  paginer(): void {
    const start = this.currentPage * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    console.log(`🎯 Affichage de l’index ${start} à ${end}`);
    this.adherentsAffiches = this.adherents.slice(start, end);
  }

  ouvrirFormulaire(cin: string) {
    this.recepteurCin = cin;
    this.showModal = true;
  }

  fermerFormulaire() {
    this.showModal = false;
    this.nombreActions = 1;
    this.commentaire = '';
  }

  envoyerTransfert() {
    const dto: TransfertActionRequestDTO = {
      cinVendeur: this.monCin,
      cinAcheteur: this.recepteurCin,
      nombreActions: this.nombreActions,
      commentaire: this.commentaire
    };

    this.transfertService.demanderTransfert(dto).subscribe({
      next: () => {
        Swal.fire('✅ Transfert envoyé', '', 'success');
        this.fermerFormulaire();
      },
      error: (err) => {
        Swal.fire('❌ Erreur', err.error || 'Impossible d\'envoyer le transfert', 'error');
      }
    });
  }

}
