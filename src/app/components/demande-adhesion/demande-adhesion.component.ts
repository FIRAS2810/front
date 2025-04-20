import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeAdhesionService } from '../../services/demande-adhesion.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-demande-adhesion',
  templateUrl: './demande-adhesion.component.html',
  styleUrls: ['./demande-adhesion.component.css']
})
export class DemandeAdhesionComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() fermer = new EventEmitter<void>();

  showConfirmation = false;
  showPDF: any;
  demandeForm!: FormGroup;
  fichier: File | null = null;
  maxDateNaissance: string = '';

  constructor(
    private fb: FormBuilder,
    private demandeService: DemandeAdhesionService
  ) {}

  ngOnInit(): void {
    const today = new Date();
    const annee = today.getFullYear() - 18;
    const mois = (today.getMonth() + 1).toString().padStart(2, '0');
    const jour = today.getDate().toString().padStart(2, '0');
    this.maxDateNaissance = `${annee}-${mois}-${jour}`;

    this.demandeForm = this.fb.group({
      cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      sexe: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      email: ['', [Validators.required, this.validateEmailFormat.bind(this)]],
      adresse: ['', Validators.required],
      activite: ['', Validators.required],
    });
  }

  handleFileUpload(event: any) {
    this.fichier = event.target.files[0];
  }

  closeForm() {
    this.fermer.emit();
  }

  confirm() {
    if (this.demandeForm.invalid) {
      this.demandeForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Champs invalides',
        text: 'Veuillez remplir correctement tous les champs.',
        confirmButtonColor: '#f39c12'
      });
      return;
    }

    const birthDate = new Date(this.demandeForm.value.dateNaissance);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

    if (age < 18) {
      Swal.fire({
        icon: 'warning',
        title: 'Âge invalide',
        text: 'Vous devez avoir au moins 18 ans.',
        confirmButtonColor: '#f39c12'
      });
      return;
    }

    if (!this.fichier) {
      Swal.fire({
        icon: 'warning',
        title: 'Fichier manquant',
        text: 'Veuillez sélectionner un fichier justificatif.',
        confirmButtonColor: '#f39c12'
      });
      return;
    }

    const form = new FormData();
    Object.entries(this.demandeForm.value).forEach(([key, value]) => {
      form.append(key, value as string);
    });
    form.append('fichier', this.fichier);

    this.demandeService.soumettreDemande(form).subscribe({
      next: () => {
        this.showConfirmation = true;
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la soumission.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  closeConfirmation() {
    this.showConfirmation = false;
  }

  async downloadForm() {
    const doc = await this.createStyledPDF();
    const data = this.demandeForm.value;
    doc.save(`demande_adhesion_${data.nom}_${data.prenom}.pdf`);
  }

  async printForm() {
    const doc = await this.createStyledPDF();
    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
  }

  private async createStyledPDF(): Promise<jsPDF> {
    const doc = new jsPDF();
    const data = this.demandeForm.value;

    doc.setFontSize(16);
    doc.text('Demande d’adhésion', 75, 25);
    doc.setFontSize(12);
    doc.text('Informations du demandeur :', 20, 50);

    autoTable(doc, {
      startY: 55,
      head: [['Champ', 'Valeur']],
      body: [
        ['CIN', data.cin],
        ['Nom', data.nom],
        ['Prénom', data.prenom],
        ['Sexe', data.sexe],
        ['Date de naissance', data.dateNaissance],
        ['Téléphone', data.telephone],
        ['Email', data.email],
        ['Adresse', data.adresse],
        ['Activité', data.activite],
      ],
      theme: 'grid',
      styles: { fontSize: 10 },
    });

    const pageHeight = doc.internal.pageSize.height;
    doc.text("Signature du demandeur :", 20, pageHeight - 30);
    doc.line(20, pageHeight - 28, 90, pageHeight - 28);

    return doc;
  }

  validateEmailFormat(control: any) {
    const email = control.value;
    const stricterRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return stricterRegex.test(email) ? null : { emailInvalid: true };
  }
  
}
