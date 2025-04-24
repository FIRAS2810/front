import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';
import { AdherentService, AdherentTableDTO } from '../../../services/adherent.service';

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
  dateDernierVersement?: string; // LocalDate => string
}


@Component({
  selector: 'app-adherents',
  templateUrl: './adherents.component.html',
  styleUrls: ['./adherents.component.css']
})
export class AdherentsComponent implements OnInit {
suspendre(_t22: any) {
throw new Error('Method not implemented.');
}
  @ViewChild('dt') table!: Table;

  adherents: Adherent[] = [];
  allAdherents: Adherent[] = [];
  selectedAdherent: Adherent | null = null;
  loading: boolean = true;
  bilan: BilanCotisationDTO | null = null;

  dropdownVisibleForCin: string | null = null;



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
    if (this.dropdownVisibleForCin === adherent.cin) {
      this.dropdownVisibleForCin = null; // Si déjà ouvert → fermer
    } else {
      this.dropdownVisibleForCin = adherent.cin; // Sinon → ouvrir pour cet adhérent
    }
  }
  

  update(adherent: Adherent): void {
    alert(`🔧 Update ${adherent.nom}`);
  }

  desactiver(adherent: Adherent): void {
    if (confirm(`Désactiver ${adherent.nom} ${adherent.prenom} ?`)) {
      this.http.patch(`${this.apiUrl}/${adherent.cin}/desactiver`, {}).subscribe(() => {
        this.loadAdherents();
      });
    }
  }

  envoyerMessage(adherent: Adherent): void {
    alert(`📧 Message à ${adherent.email}`);
  }
}
