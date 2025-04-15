import { Component, OnInit } from '@angular/core';
import { NouveauteDTO, NouveauteService } from '../../services/nouveaute.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent implements OnInit {

  nouveautes: NouveauteDTO[] = [];

  selectedNouveaute: any = null; // IMPORTANT

voirDetailsNouv(nouveaute: any) {
  console.log("Clicked nouveaute:", nouveaute); // Juste pour vérifier dans la console
  this.selectedNouveaute = nouveaute;
}

closeDetails() {
  this.selectedNouveaute = null;
}


  
  constructor(private nouveauteService: NouveauteService){
    
  }

  ngOnInit(): void {
    this.nouveauteService.getAllNouveautes().subscribe({
      next: (data) => {
        this.nouveautes = data
          .sort((a, b) => new Date(b.datePublication).getTime() - new Date(a.datePublication).getTime()) // ⬅️ tri décroissant
          .map(n => ({
            ...n,
            image: n.typeFichier === 'IMAGE'
              ? `data:image/png;base64,${n.fichierBase64}`
              : 'assets/annoncement.jpg',
            fichierPdf: n.fichierBase64
          }));
      }
    });
  }
  
  

  voirDetails(nouveaute: NouveauteDTO) {
    alert(`Description : ${nouveaute.description}`);
  }
  // Étapes pour adhérer
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
  

  // Méthode pour voir les détails de la nouveauté
  

  showForm = false;

  ouvrirFormulaire() {
    this.showForm = true;
    document.body.style.overflow = 'hidden'; // Bloquer le scroll
  }
  
  fermerFormulaire() {
    this.showForm = false;
    document.body.style.overflow = 'auto'; // Rétablir le scroll
  }
}
