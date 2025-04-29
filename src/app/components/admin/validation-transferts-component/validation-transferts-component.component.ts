import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TransfertActionResponseDTO, TransfertServiceService } from '../../../services/transfert-service.service';

@Component({
  selector: 'app-validation-transferts-component',
  templateUrl: './validation-transferts-component.component.html',
  styleUrl: './validation-transferts-component.component.css'
})
export class ValidationTransfertsComponentComponent implements OnInit {

  transferts: TransfertActionResponseDTO[] = [];

  etatSelectionne: string = 'TOUS'; // par défaut

page: number = 1;
itemsPerPage: number = 5;

  constructor(private transfertService: TransfertServiceService) {}

  rowsPerPage = 5;

changerNombreParPage() {
  this.setPage(1);
}


  ngOnInit(): void {
    this.chargerTransferts();
  }

  chargerTransferts() {
    this.transfertService.getTousPourAdmin().subscribe(data => {
      if (this.etatSelectionne === 'TOUS') {
        this.transferts = data;
      } else {
        this.transferts = data.filter(t => t.statut === this.etatSelectionne);
      }
    });
    
    
  }

  changerEtat(etat: string) {
    this.etatSelectionne = etat;
    this.chargerTransferts();
  }
  
  

  valider(id: number) {
    Swal.fire({
      title: 'Confirmer la validation ?',
      text: 'Cette action va valider définitivement le transfert.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, valider',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#16a34a'
    }).then(result => {
      if (result.isConfirmed) {
        this.transfertService.validerTransfert(id).subscribe(() => {
          Swal.fire('✅ Transfert validé !', '', 'success');
          this.chargerTransferts();
        });
      }
    });
  }
  

  refuser(id: number) {
    Swal.fire({
      title: 'Confirmer le refus ?',
      text: 'Ce transfert sera marqué comme refusé.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, refuser',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#dc2626'
    }).then(result => {
      if (result.isConfirmed) {
        this.transfertService.refuserTransfert(id).subscribe(() => {
          Swal.fire('❌ Transfert refusé.', '', 'info');
          this.chargerTransferts();
        });
      }
    });
  }
  

  

get transfertsPage() {
  const start = (this.page - 1) * this.itemsPerPage;
  return this.transferts.slice(start, start + this.itemsPerPage);
}

get totalPages() {
  const pages = Math.ceil(this.transferts.length / this.itemsPerPage);
  return Array(pages).fill(0).map((_, i) => i + 1);
}

setPage(p: number) {
  this.page = p;
}


}
