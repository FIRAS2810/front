import { Component, OnInit, ViewChild } from '@angular/core';
import { DemandeDTO, DemandeServiceService } from '../../../services/demande-service.service';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent implements OnInit {

  @ViewChild('dt') table!: Table;

  demandes: DemandeDTO[] = [];
  allDemandes: DemandeDTO[] = []
   // 🔁 contient toutes les demandes

  selectedDemande: DemandeDTO | null = null;
  loading: boolean = true;


imagePopupVisible: boolean = false;
imagePopupSrc: string = '';
  

  constructor(private demandeService: DemandeServiceService) {}

  ngOnInit(): void {
    this.loadDemandes();
    
  }

  isPdf(typeFichier: string): boolean {
    return typeFichier === 'application/pdf';
}

  loadDemandes(): void {
    this.demandeService.getAllDemandes().subscribe({
      next: (data) => {
        
        this.demandes = data;
        this.allDemandes = [...data]; // ✅ COPIE complète ici
        this.loading = false;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement des demandes', err);
        this.loading = false;
      }
    });
  }

  onGlobalSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.table.filterGlobal(input.value, 'contains');
  }

  openPopup(demande: DemandeDTO): void {
    this.selectedDemande = demande;
  }

  closePopup(): void {
    this.selectedDemande = null;
  }

  accepterDemande(id: number): void {
    this.demandeService.changerStatutDemande(id, 'ACCEPTEE').subscribe({
      next: () => {
        console.log('✅ Demande acceptée');
        Swal.fire('Succès', 'La demande a été acceptée !', 'success');

        this.loadDemandes(); // Recharger la liste
      },
      error: (err) => {
        console.error('❌ Erreur lors de l’acceptation', err);
      }
    });
  }
  
  refuserDemande(id: number): void {
    this.demandeService.changerStatutDemande(id, 'REFUSEE').subscribe({
      next: () => {
        console.log('🛑 Demande refusée');
        Swal.fire('Refusée', 'La demande a été refusée.', 'warning');
        this.loadDemandes();
      },
      error: (err) => {
        console.error('❌ Erreur lors du refus', err);
        Swal.fire('Erreur', 'Une erreur s’est produite lors du refus.', 'error');
      }
    });
  }
  
  
  




  etatOptions = [
    {
      label: 'Tous',
      icon: 'pi pi-list',
      command: () => this.resetFiltreEtat()
    },
    {
      label: 'EN_ATTENTE',
      icon: 'pi pi-clock',
      command: () => this.filtrerParEtat('EN_ATTENTE')
    },
    {
      label: 'ACCEPTEE',
      icon: 'pi pi-check-circle',
      command: () => this.filtrerParEtat('ACCEPTEE')
    },
    {
      label: 'REFUSEE',
      icon: 'pi pi-times-circle',
      command: () => this.filtrerParEtat('REFUSEE')
    }
  ];
  
  etatActif: string | null = null;
  
  filtrerParEtat(etat: string) {
    this.etatActif = etat;
    this.demandes = this.allDemandes.filter(d => d.etat === etat);
  }
  
  resetFiltreEtat() {
    this.etatActif = null;
    this.demandes = [...this.allDemandes];
  }
  

  

ouvrirPopupImage(demande: any) {
  this.imagePopupSrc = `data:${demande.typeFichier};base64,${demande.justificatifBase64}`;
  this.imagePopupVisible = true;
}

fermerPopupImage() {
  this.imagePopupVisible = false;
}

}
