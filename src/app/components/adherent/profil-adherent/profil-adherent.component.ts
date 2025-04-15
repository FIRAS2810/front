import { Component, OnInit } from '@angular/core';
import { AdherentProfileDTO, AdherentService, AdherentUpdateDTO } from '../../../services/adherent.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil-adherent',
  templateUrl: './profil-adherent.component.html',
  styleUrl: './profil-adherent.component.css'
})
export class ProfilAdherentComponent implements OnInit {

  logo: string = "adherent-avatar.png";

  adherentData!: AdherentProfileDTO;
  originalData!: AdherentProfileDTO;
  isDisabled: boolean = true;
  ancienEmail!: string;

  constructor(private adherentService: AdherentService) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');

    if (email) {
      this.adherentService.getMonProfil(email).subscribe({
        next: (data) => {
          console.log("Données récupérées du backend :", data);
          this.adherentData = data;
          this.originalData = JSON.parse(JSON.stringify(data)); // copie originale
          this.ancienEmail = data.email;
        },
        error: (err) => {
          console.error("Erreur lors de la récupération :", err);
        }
      });
    } else {
      console.log("Aucun email trouvé dans le localStorage !");
    }
  }

  toggleEdit() {
    this.isDisabled = !this.isDisabled;
  }

  // 🔍 Compare l'état actuel au snapshot original
  hasModifications(): boolean {
    return JSON.stringify(this.adherentData) !== JSON.stringify(this.originalData);
  }

  modifier() {
    if (!this.hasModifications()) {
      // 🔔 Alerte si rien n’a changé
      Swal.fire({
        icon: 'info',
        title: 'Aucune modification',
        text: 'Aucune information n’a été modifiée.',
        confirmButtonText: 'OK'
      });
      return;
    }

    const updateData: AdherentUpdateDTO = {
      nom: this.adherentData.nom,
      prenom: this.adherentData.prenom,
      telephone: this.adherentData.telephone,
      adresse: this.adherentData.adresse,
      email: this.adherentData.email,
      dateNaissance: this.adherentData.dateNaissance,
    };

    this.adherentService.updateProfilAdherent(this.ancienEmail, updateData)
      .subscribe({
        next: () => {
          console.log('✅ Profil modifié avec succès');
          this.isDisabled = true;

          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Votre profil a été modifié avec succès !',
            confirmButtonText: 'OK'
          });

          // MAJ des données originales
          this.originalData = JSON.parse(JSON.stringify(this.adherentData));

          // MAJ email localStorage et variable
          localStorage.setItem('email', this.adherentData.email);
          this.ancienEmail = this.adherentData.email;
        },
        error: (err) => {
          console.error('❌ Erreur lors de la modification', err);
        }
      });
  }
}
