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
    const demande = this.demandes.find(d => d.id === id);
  
    Swal.fire({
      title: 'Confirmer l\'acceptation',
      text: `Êtes-vous sûr de vouloir accepter la demande de ${demande?.nom} ${demande?.prenom} ?`,
      icon: 'success',
      iconHtml: '✔️',
      showCancelButton: true,
      confirmButtonColor: '#4e8e35',
      cancelButtonColor: '#e0e0e0',
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      customClass: {
        title: 'popup-title',
        popup: 'popup-box',
        confirmButton: 'popup-confirm-btn',
        cancelButton: 'popup-cancel-btn',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.demandeService.changerStatutDemande(id, 'ACCEPTEE').subscribe({
          next: () => {
            demande!.showDropdown = false;
            Swal.fire('Acceptée', 'La demande a été acceptée.', 'success');
            this.loadDemandes();
          },
          error: () => {
            Swal.fire('Erreur', 'Une erreur est survenue.', 'error');
          }
        });
      }
    });
  }
  

  refuserDemande(id: number): void {
    const demande = this.demandes.find(d => d.id === id);
  
    Swal.fire({
      title: 'Confirmer le refus',
      text: `Êtes-vous sûr de vouloir refuser la demande de ${demande?.nom} ${demande?.prenom} ?`,
      icon: 'error',
      iconHtml: '❌',
      showCancelButton: true,
      confirmButtonColor: '#e63946',
      cancelButtonColor: '#e0e0e0',
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      customClass: {
        title: 'popup-title',
        popup: 'popup-box',
        confirmButton: 'popup-confirm-btn',
        cancelButton: 'popup-cancel-btn',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.demandeService.changerStatutDemande(id, 'REFUSEE').subscribe({
          next: () => {
            demande!.showDropdown = false;
            Swal.fire('Refusée', 'La demande a été refusée.', 'warning');
            this.loadDemandes();
          },
          error: () => {
            Swal.fire('Erreur', 'Une erreur est survenue.', 'error');
          }
        });
      }
    });
  }
  

  scrollToButton(id: number) {
    const element = document.getElementById('dropdown-' + id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  
  
  toggleDropdown(demande: any): void {
    // Fermer tous les autres dropdowns
    this.demandes.forEach(d => {
      if (d.id !== demande.id) d.showDropdown = false;
    });
  
    // Inverser le dropdown actuel
    demande.showDropdown = !demande.showDropdown;
  
    // Scroll automatique si dropdown affiché
    if (demande.showDropdown) {
      setTimeout(() => {
        const element = document.getElementById('dropdown-' + demande.id);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
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
