import { Component, OnInit } from '@angular/core';
import { AdherentProfileDTO, AdherentService, AdherentUpdateDTO } from '../../../services/adherent.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil-adherent',
  templateUrl: './profil-adherent.component.html',
  styleUrls: ['./profil-adherent.component.css']
})
export class ProfilAdherentComponent implements OnInit {

  logo: string = "adherent-avatar.png";

  adherentData!: AdherentProfileDTO;
  originalData!: AdherentProfileDTO;
  isDisabled: boolean = true;
  ancienEmail!: string;
  bilan: any = null;

  constructor(private adherentService: AdherentService) {}

  ngOnInit(): void {
    
    const email = localStorage.getItem('email');

    if (email) {
      this.adherentService.getMonProfil(email).subscribe({
        next: (data) => {
          console.log("Données récupérées du backend :", data);
          this.adherentData = data;
          this.originalData = JSON.parse(JSON.stringify(data));
          this.ancienEmail = data.email;

          // ✅ Appel du bilan de cotisation via AdherentService
          this.adherentService.getBilanCotisation(data.cin).subscribe({
            next: (res) => {
              this.bilan = res;
              console.log("🎯 Bilan reçu :", res);
            },
            error: (err) => console.error("Erreur de chargement du bilan", err)
          });
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

  hasModifications(): boolean {
    return JSON.stringify(this.adherentData) !== JSON.stringify(this.originalData);
  }

  modifier() {
    if (!this.hasModifications()) {
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

          this.originalData = JSON.parse(JSON.stringify(this.adherentData));
          localStorage.setItem('email', this.adherentData.email);
          this.ancienEmail = this.adherentData.email;
        },
        error: (err) => {
          console.error('❌ Erreur lors de la modification', err);
        }
      });
  }

  selectedPhoto: File | null = null;
defaultImageBase64 = ''; // si tu veux une image par défaut (genre un avatar de secours)

onFileSelected(event: any) {
  this.selectedPhoto = event.target.files[0];
}

loadProfil() {
  this.adherentService.getMonProfil(this.adherentData.email).subscribe({
    next: (data) => {
      this.adherentData = data;
    },
    error: () => {
      Swal.fire('Erreur', 'Impossible de charger le profil', 'error');
    }
  });
}

uploadPhoto() {
  if (this.selectedPhoto) {
    const formData = new FormData();
    formData.append('photo', this.selectedPhoto);

    this.adherentService.updatePhoto(this.adherentData.cin, formData).subscribe({
      next: () => {
        Swal.fire('Succès', 'Photo mise à jour avec succès', 'success');
        this.loadProfil(); // recharge l’image
      },
      error: () => {
        Swal.fire('Erreur', 'Échec de l’upload', 'error');
      }
    });
  }
}

}
