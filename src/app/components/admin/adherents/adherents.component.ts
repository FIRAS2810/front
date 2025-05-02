import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { AdherentService } from '../../../services/adherent.service';
import Swal from 'sweetalert2';

interface Adherent {
  cin: string;
  nom: string;
  prenom: string;
  tel: string;
  email: string;
  etat: string;
  dateAdhesion: string;
  dateFin: string;
  montant: number;
  nbActions: number;
  sexe: string;
  photoProfilBase64?: string;
  photo?: string;
}

export interface BilanCotisationDTO {
  montantTotalVerse: number;
  nombreTotalActions: number;
  montantRestant: number;
  adhesionComplete: boolean;
  dateDernierVersement?: string;
}

@Component({
  selector: 'app-adherents',
  templateUrl: './adherents.component.html',
  styleUrls: ['./adherents.component.css']
})
export class AdherentsComponent implements OnInit {
  @ViewChild('dt') table!: Table;

  adherents: Adherent[] = [];
  allAdherents: Adherent[] = [];
  selectedAdherent: Adherent | null = null;
  loading: boolean = true;
  bilan: BilanCotisationDTO | null = null;

  dropdownVisibleForCin: string | null = null;

  showCotisationPopup: boolean = false;
  adherentPourCotisation: Adherent | null = null;
  montantCotisation: number | null = null;

  private readonly apiUrl = 'http://localhost:8080/api/adherents';

  constructor(private http: HttpClient, private adherentService: AdherentService) {}

  ngOnInit(): void {
    this.loadAdherents();
  }

  loadAdherents(): void {
    this.adherentService.getAllAdherents().subscribe({
      next: data => {
        this.adherents = data.map(adherent => ({
          ...adherent,
          photo: (adherent.photoProfilBase64 && adherent.photoProfilBase64.trim() !== '')
            ? `data:image/jpeg;base64,${adherent.photoProfilBase64}`
            : this.getDefaultAvatar(adherent.sexe),
          montant: adherent.montant || 0,
          nbActions: adherent.nbActions || 0
        }));
        this.allAdherents = [...this.adherents];
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  getDefaultAvatar(sexe: string): string {
    return sexe === 'Femme' ? 'fatma.jpg' : 'avatar.jpg';
  }

  onGlobalSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.table.filterGlobal(input.value, 'contains');
  }

  showDetails(adherent: Adherent): void {
    this.selectedAdherent = adherent;
    this.bilan = null;

    this.adherentService.getBilanCotisation(adherent.cin).subscribe({
      next: (data) => this.bilan = data
    });
  }

  closePopup(): void {
    this.selectedAdherent = null;
  }

  toggleDropdown(adherent: Adherent): void {
    this.dropdownVisibleForCin = this.dropdownVisibleForCin === adherent.cin ? null : adherent.cin;
  }

  ouvrirPopupCotisation(adherent: Adherent): void {
    this.adherentPourCotisation = adherent;
    this.montantCotisation = null;
    this.showCotisationPopup = true;
    this.dropdownVisibleForCin = null;
  }

  fermerPopupCotisation(): void {
    this.showCotisationPopup = false;
    this.adherentPourCotisation = null;
    this.montantCotisation = null;
  }

  ajouterCotisation(): void {
    if (this.adherentPourCotisation && this.montantCotisation && this.montantCotisation > 0) {
      this.http.post(`http://localhost:8080/api/cotisations/ajouter/${this.adherentPourCotisation.cin}?montantVerse=${this.montantCotisation}`, {})
        .subscribe({
          next: () => {
            this.fermerPopupCotisation();
            this.loadAdherents();
            alert('✅ Cotisation ajoutée avec succès');
          },
          error: () => {
            alert('❌ Erreur lors de l\'ajout de cotisation');
          }
        });
    } else {
      alert('⚠️ Veuillez entrer un montant valide');
    }
  }

  signalerDeces(adherent: Adherent): void {
    if (adherent.etat === 'DÉCÉDÉ') {
      Swal.fire('⚠️ Déjà décédé', 'Cet adhérent est déjà marqué comme décédé.', 'info');
      return;
    }
  
    Swal.fire({
      title: 'Signaler un décès ?',
      html: `<strong>${adherent.nom} ${adherent.prenom}</strong> sera marqué comme <b>décédé</b>.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '✅ Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa'
    }).then(result => {
      if (result.isConfirmed) {
        this.http.patch(`${this.apiUrl}/signaler-deces/${adherent.cin}`, {}).subscribe({
          next: () => {
            Swal.fire('✅ Succès', 'Décès signalé avec succès.', 'success');
            this.loadAdherents();
          },
          error: () => {
            Swal.fire('❌ Erreur', 'Une erreur est survenue.', 'error');
          }
        });
      }
    });
  }
  

  signalerExclusionTemporaire(adherent: Adherent): void {
    if (adherent.etat === 'EXCLU') {
      Swal.fire('⚠️ Déjà exclu', 'Cet adhérent est déjà exclu.', 'info');
      return;
    }
  
    Swal.fire({
      title: 'Exclusion temporaire ?',
      html: `Confirmez-vous l’exclusion de <strong>${adherent.nom} ${adherent.prenom}</strong> ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '🚫 Exclure',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#f0ad4e',
      cancelButtonColor: '#aaa'
    }).then(result => {
      if (result.isConfirmed) {
        this.http.patch(`${this.apiUrl}/exclure-temporairement/${adherent.cin}`, {}).subscribe({
          next: () => {
            Swal.fire('✅ Exclu', 'Adhérent exclu temporairement.', 'success');
            this.loadAdherents();
          },
          error: () => {
            Swal.fire('❌ Erreur', 'Une erreur est survenue.', 'error');
          }
        });
      }
    });
  }
  
}
