import { Component, OnInit } from '@angular/core';
import { ReclamationServiceService } from '../../services/reclamation-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-demande-reclamation',
  templateUrl: './demande-reclamation.component.html',
  styleUrl: './demande-reclamation.component.css'
})
export class DemandeReclamationComponent implements OnInit {
  reclamationForm!: FormGroup;
  currentDate: string = '';

  constructor(
    private fb: FormBuilder,
    private reclamationService: ReclamationServiceService
  ) {}

  ngOnInit(): void {
    this.currentDate = new Date().toISOString().split('T')[0];

    this.reclamationForm = this.fb.group({
      motif: ['', [Validators.required, Validators.minLength(10)]],
      cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], // 8 chiffres
      dateReclamation: [this.currentDate, Validators.required]
    });
  }

  submitReclamation(): void {
    if (this.reclamationForm.valid) {
      this.reclamationService.submitReclamation(this.reclamationForm.value).subscribe({
        next: () => {
          alert('✅ Votre réclamation a été envoyée avec succès.');
          this.reclamationForm.reset({
            motif: '',
            cin: '',
            dateReclamation: this.currentDate
          });
        },
        error: () => {
          alert('❌ Une erreur est survenue.');
        }
      });
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }

}
