import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DemandeAdhesionService } from '../../services/demande-adhesion.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-demande-adhesion',
  templateUrl: './demande-adhesion.component.html',
  styleUrls: ['./demande-adhesion.component.css']
})
export class DemandeAdhesionComponent {
  @Input() show: boolean = false;
  @Output() fermer = new EventEmitter<void>();

  demandes: any[] = [];

  formData: any = {
    cin: '',
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    adresse: '',
    activite: '',
    dateNaissance: ''
  };

  fichier: File | null = null;

  

  constructor(private demandeService: DemandeAdhesionService) {}

  handleFileUpload(event: any) {
    this.fichier = event.target.files[0];
  }

  closeForm() {
    this.fermer.emit();
  }

  confirm() {
    if (!this.fichier) {
      Swal.fire({
        icon: 'warning',
        title: 'Fichier manquant',
        text: 'Veuillez sélectionner un fichier justificatif.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }
  
    const form = new FormData();
    Object.entries(this.formData).forEach(([key, value]) => {
      form.append(key, value as string);
    });
    form.append('fichier', this.fichier);
  
    this.demandeService.soumettreDemande(form).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Demande soumise',
          text: '✅ Votre demande a été soumise avec succès !',
          confirmButtonColor: '#28a745'
        });
        this.closeForm();
      },
      error: (err) => {
        console.error("❌ Erreur lors de la soumission :", err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la soumission.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }
}
