import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DemandeAdhesionService } from '../../services/demande-adhesion.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-demande-adhesion',
  templateUrl: './demande-adhesion.component.html',
  styleUrls: ['./demande-adhesion.component.css']
})
export class DemandeAdhesionComponent {
  @Input() show: boolean = false;
  @Output() fermer = new EventEmitter<void>();

  showConfirmation = false;

  formData: any = {
    cin: '',
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    adresse: '',
    activite: '',
    dateNaissance: '',
    sexe: ''
  };

  fichier: File | null = null;
showPDF: any;
formDataForPDF: any;

  constructor(private demandeService: DemandeAdhesionService) {}

  handleFileUpload(event: any) {
    this.fichier = event.target.files[0];
  }

  closeForm() {
    this.fermer.emit();
  }

  confirm() {
    if (!this.fichier) {
      alert("Veuillez sélectionner un fichier justificatif.");
      return;
    }

    const form = new FormData();
    Object.entries(this.formData).forEach(([key, value]) => {
      form.append(key, value as string);
    });
    form.append('fichier', this.fichier);

    this.demandeService.soumettreDemande(form).subscribe({
      next: () => {
        this.show = false;
        this.showConfirmation = true;
      },
      error: (err) => {
        console.error("❌ Erreur lors de la soumission :", err);
        alert("Une erreur est survenue lors de la soumission.");
      }
    });
  }

  closeConfirmation() {
    this.showConfirmation = false;
  }

  async downloadForm() {
    console.log("⬇️ CLICK: Download bouton cliqué !");
    const doc = await this.createStyledPDF();
    doc.save(`demande_adhesion_${this.formData.nom}_${this.formData.prenom}.pdf`);
  }
  
  async printForm() {
    console.log("🖨 CLICK: Print bouton cliqué !");
    const doc = await this.createStyledPDF();
    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
  }
  

  private async createStyledPDF(): Promise<jsPDF> {
    const doc = new jsPDF();
  
    // Titre sans logo
    doc.setFontSize(16);
    doc.text('Demande d’adhésion', 75, 25);
  
    doc.setFontSize(12);
    doc.text('Informations du demandeur :', 20, 50);
  
    autoTable(doc, {
      startY: 55,
      head: [['Champ', 'Valeur']],
      body: [
        ['CIN', this.formData.cin],
        ['Nom', this.formData.nom],
        ['Prénom', this.formData.prenom],
        ['Sexe', this.formData.sexe],
        ['Date de naissance', this.formData.dateNaissance],
        ['Téléphone', this.formData.telephone],
        ['Email', this.formData.email],
        ['Adresse', this.formData.adresse],
        ['Activité', this.formData.activite],
      ],
      theme: 'grid',
      styles: { fontSize: 10 },
    });
  
    const pageHeight = doc.internal.pageSize.height;
    doc.text("Signature du demandeur :", 20, pageHeight - 30);
    doc.line(20, pageHeight - 28, 90, pageHeight - 28);
  
    return doc;
  }
  


  private loadImage(url: string): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = url;
    });
  }
  
}
