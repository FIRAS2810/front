import { Component, OnInit } from '@angular/core';
import { NouveauteDTO, NouveauteService } from '../../services/nouveaute.service';
import { DescriptionService } from '../../services/description.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {
  // === Nouveautés ===
  nouveautes: NouveauteDTO[] = [];
  selectedNouveaute: any = null;

  voirDetailsNouv(nouveaute: any) {
    console.log("Clicked nouveaute:", nouveaute);
    this.selectedNouveaute = nouveaute;
  }

  closeDetails() {
    this.selectedNouveaute = null;
  }

  // === Description SMBSA ===
  showPopup = false;
  htmlContent = '';

  openPopup() {
    // Recharge le contenu à chaque clic
    this.descriptionService.getDescription().subscribe({
      next: (data) => {
        this.htmlContent = data.contenuHtml || '';
        this.showPopup = true;
      },
      error: (err) => {
        console.error("Erreur récupération description :", err);
      }
    });
  }
  

  closePopup() {
    this.showPopup = false;
  }

  // === Formulaire d'adhésion ===
  showForm = false;

  ouvrirFormulaire() {
    this.showForm = true;
    document.body.style.overflow = 'hidden';
  }

  fermerFormulaire() {
    this.showForm = false;
    document.body.style.overflow = 'auto';
  }

  // === Étapes d’adhésion ===
  steps = [
    {
      icon: 'fas fa-user-plus',
      title: 'Cliquer sur "Devenir Membre"',
      description: 'Accédez au site de SMBSA et cliquez sur le bouton "Devenir Membre".'
    },
    {
      icon: 'fas fa-pen',
      title: 'Remplir le formulaire',
      description: 'Complétez toutes les informations requises dans le formulaire d’adhésion. Assurez-vous que les données fournies sont correctes.'
    },
    {
      icon: 'fas fa-user-check',
      title: "Attendre l'approbation de l'administrateur",
      description: 'Votre demande sera examinée par un administrateur. Une fois validée, vous recevrez un email de confirmation.'
    },
    {
      icon: 'fas fa-user',
      title: 'Créer votre compte',
      description: 'Suivez les instructions contenues dans l’email pour finaliser la création de votre compte.'
    },
    {
      icon: 'fas fa-hands-helping',
      title: 'Félicitations !',
      description: 'Vous êtes désormais membre de SMBSA et pouvez profiter de tous les avantages de la communauté. 🎉'
    }
  ];

  // === Scroll vers investissement ===
  scrollToInvest() {
    const target = document.getElementById('invest');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // === Constructeur et chargement ===
  constructor(
    private nouveauteService: NouveauteService,
    private descriptionService: DescriptionService
  ) {}

  ngOnInit(): void {
    // Récupérer les nouveautés
    this.nouveauteService.getAllNouveautes().subscribe({
      next: (data) => {
        this.nouveautes = data
          .sort((a, b) => new Date(b.datePublication).getTime() - new Date(a.datePublication).getTime())
          .map(n => ({
            ...n,
            image: n.typeFichier === 'IMAGE'
              ? `data:image/png;base64,${n.fichierBase64}`
              : 'assets/annoncement.jpg',
            fichierPdf: n.fichierBase64
          }));
      }
    });

    // Récupérer le contenu HTML de la description SMBSA
    this.descriptionService.getDescription().subscribe({
      next: (data) => {
        this.htmlContent = data.contenuHtml || '';
      },
      error: (err) => {
        console.error("Erreur de récupération de la description SMBSA :", err);
      }
    });
  }
}
