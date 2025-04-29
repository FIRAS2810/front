import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { DemissionServiceService } from '../../../services/demission-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-demission',
  templateUrl: './demande-demission.component.html',
  styleUrl: './demande-demission.component.css'
})
export class DemandeDemissionComponent {
  demissionForm!: FormGroup;
  cin: string | null = null;

  constructor(
    private fb: FormBuilder,
    private demissionService: DemissionServiceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cin = this.authService.getCinConnecte();

    this.demissionForm = this.fb.group({
      motif: ['', [Validators.required, Validators.minLength(10)]],
      cin: [this.cin]
    });
  }

  envoyerDemande(): void {
    if (this.demissionForm.valid) {
      // Ajouter le cin avant d'envoyer
      this.authService.getCinFromBackend().subscribe(cin => {
        const demande = this.demissionForm.value;
        demande.cin = cin;  // Ajouter le CIN récupéré
  
        if (!demande.cin) {
          Swal.fire('❌ Erreur', 'Impossible de récupérer votre CIN.', 'error');
          return;
        }
  
        Swal.fire({
          title: 'Confirmer la démission',
          text: 'Êtes-vous sûr de vouloir envoyer votre demande de démission ?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Oui, envoyer',
          cancelButtonText: 'Non, annuler',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.demissionService.envoyerDemande(demande).subscribe({
              next: () => {
                Swal.fire('✅ Demande envoyée', 'Votre demande de démission a été envoyée.', 'success');
                this.demissionForm.reset();
              },
              error: () => {
                Swal.fire('❌ Erreur', 'Impossible d\'envoyer votre demande.', 'error');
              }
            });
          }
        });
      });
    }
  }
  
  
}
