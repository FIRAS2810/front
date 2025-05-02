import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TransfertActionRequestDTO, TransfertActionResponseDTO, TransfertServiceService } from '../../../services/transfert-service.service';
import { AdherentService, AdherentTableDTO } from '../../../services/adherent.service';
import { AuthService } from '../../../services/auth.service';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-transferts',
  templateUrl: './transferts.component.html',
  styleUrls: ['./transferts.component.css']
})
export class TransfertsComponent implements OnInit {
  email = '';
  monCin = '';
  vendeurs: AdherentTableDTO[] = [];
  vendeursAffiches: AdherentTableDTO[] = [];

  showModal = false;
  vendeurSelectionneCin = '';
  nombreActions = 1;
  commentaire = '';

  demandesRecues: TransfertActionResponseDTO[] = [];
  mesDemandes: TransfertActionResponseDTO[] = [];

  rowsPerPage = 5;
  currentPage = 0;
  searchTerm = '';

  vue: 'DEMANDER' | 'RECU' = 'DEMANDER';


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
        this.vendeurs = all.filter(a => a.cin !== this.monCin);
        this.paginer();
      });

      this.transfertService.getHistoriqueAdherent(this.monCin).subscribe((result: TransfertActionResponseDTO[]) => {
        this.demandesRecues = result.filter(d => d.cinVendeur === this.monCin && d.statut === 'EN_ATTENTE');
        this.mesDemandes = result.filter(d => d.cinAcheteur === this.monCin);
      });
      
    });
  }

  ouvrirFormulaire(cin: string) {
    this.vendeurSelectionneCin = cin;
    this.showModal = true;
  }

  fermerFormulaire() {
    this.showModal = false;
    this.nombreActions = 1;
    this.commentaire = '';
  }

  envoyerTransfert() {
    const dto: TransfertActionRequestDTO = {
      cinVendeur: this.vendeurSelectionneCin,
      cinAcheteur: this.monCin,
      nombreActions: this.nombreActions,
      commentaire: this.commentaire
    };

    this.transfertService.demanderTransfert(dto).subscribe({
      next: () => {
        Swal.fire('✅ Demande envoyée', '', 'success');
        this.fermerFormulaire();
        this.ngOnInit();
      },
      error: (err) => {
        Swal.fire('❌ Erreur', err.error || 'Erreur lors de l\'envoi', 'error');
      }
    });
  }

  accepterDemande(id: number) {
  this.transfertService.accepterParVendeur(id).subscribe({
    next: () => {
      Swal.fire('✅ Accepté', 'Vous avez accepté cette demande.', 'success');
      
    },
    error: (err) => {
      Swal.fire('❌ Refus automatique', err.error, 'error');
      
    }
  });
}


  refuserDemande(id: number) {
    this.transfertService.refuserParVendeur(id).subscribe(() => {
      Swal.fire('❌ Refusée', '', 'info');
      this.ngOnInit();
    });
  }

  changerPage(event: PaginatorState) {
    this.currentPage = event.page ?? 0;
    this.rowsPerPage = event.rows ?? 5;
    this.searchTerm.trim() === '' ? this.paginer() : this.filtrerVendeurs();
  }

  paginer(): void {
    const start = this.currentPage * this.rowsPerPage;
    this.vendeursAffiches = this.vendeurs.slice(start, start + this.rowsPerPage);
  }

  filtrerVendeurs(): void {
    const term = this.searchTerm.trim().toLowerCase();
    const filtered = this.vendeurs.filter(a =>
      a.nom.toLowerCase().includes(term) ||
      a.prenom.toLowerCase().includes(term) ||
      a.email.toLowerCase().includes(term)
    );
    this.currentPage = 0;
    this.vendeursAffiches = filtered.slice(0, this.rowsPerPage);
  }
}
