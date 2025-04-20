import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Adherent {
  id: number;
  nom: string;
  prenom: string;
  cin: string;
  tel: string;
  email: string;
  etat: string;
  dateAdhesion: string;
  dateFin: string;
  montant: number;
  nbActions: number;
  photoProfilBase64: string;
  sexe: string;
  showDropdown?: boolean;
  photo: string; // Ajout de la propriété manquante
}

@Component({
  selector: 'app-adherents',
  templateUrl: './adherents.component.html',
  styleUrls: ['./adherents.component.css']
})
export class AdherentsComponent implements OnInit {
  private readonly apiUrl = 'http://localhost:8080/api/adherents'; // Définition de apiUrl
  adherents: Adherent[] = [];
  selectedAdherent: Adherent | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAdherents();
    document.addEventListener('click', this.closeAllDropdowns);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.closeAllDropdowns);
  }

  loadAdherents(): void {
    this.http.get<Adherent[]>(`${this.apiUrl}/tous`).subscribe(data => {
      this.adherents = data.map(adherent => ({
        ...adherent,
        photo: adherent.photoProfilBase64 
          ? `data:image/jpeg;base64,${adherent.photoProfilBase64}`
          : this.getDefaultAvatar(adherent.sexe),
        dateFin: adherent.dateFin,
        montant: adherent.montant || 0,
        nbActions: adherent.nbActions || 0
      }));
    });
  }

  getDefaultAvatar(sexe: string): string {
    return sexe === 'FEMME' 
      ? 'assets/avatar-femme.png' 
      : 'assets/avatar-homme.png';
  }

  showDetails(adherent: Adherent): void {
    this.selectedAdherent = adherent;
  }

  closePopup(): void {
    this.selectedAdherent = null;
  }

  // Gestion des dropdowns
  toggleDropdown(adherent: Adherent): void {
    adherent.showDropdown = !adherent.showDropdown;
  }

  @HostListener('document:click')
  closeAllDropdowns(): void {
    this.adherents.forEach(a => a.showDropdown = false);
  }

  // Actions
  update(adherent: Adherent): void {
    // Implémentez la logique de mise à jour
  }

  desactiver(adherent: Adherent): void {
    if (confirm(`Désactiver ${adherent.nom} ${adherent.prenom} ?`)) {
      this.http.patch(`${this.apiUrl}/${adherent.id}/desactiver`, {})
        .subscribe(() => this.loadAdherents());
    }
  }

  envoyerMessage(adherent: Adherent): void {
    // Implémentez l'envoi de message
  }
}