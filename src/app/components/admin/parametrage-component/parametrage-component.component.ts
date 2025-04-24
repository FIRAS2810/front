import { Component, OnInit } from '@angular/core';
import { ParametrageServiceService } from '../../../services/parametrage-service.service';



interface Parametrage {
  id: number;
  montantMinimalAdhesion: number;
  valeurAction: number;
  nbActionsMinimales: number;
}

interface HistoriqueParametrage {
  id: number;
  montantMinimalAdhesion: number;
  valeurAction: number;
  nbActionsMinimales: number;
  dateModification: string;
}

@Component({
  selector: 'app-parametrage-component',
  templateUrl: './parametrage-component.component.html',
  styleUrl: './parametrage-component.component.css'
})
export class ParametrageComponentComponent implements OnInit {
  parametrage: Parametrage = { id: 1, montantMinimalAdhesion: 0, valeurAction: 0, nbActionsMinimales: 0 };
  historique: HistoriqueParametrage[] = [];
  loading: boolean = false;
  

  constructor(private paramService: ParametrageServiceService) {}

  ngOnInit(): void {
    this.chargerParametrage();
    this.chargerHistorique();
  }

  chargerParametrage(): void {
    this.paramService.getParametrage().subscribe(data => {
      this.parametrage = data;
    });
  }

  chargerHistorique(): void {
    this.paramService.getHistoriqueParametrage().subscribe(data => {
      this.historique = data;
    });
  }

  enregistrer(): void {
    this.loading = true;
    this.paramService.updateParametrage(this.parametrage.id, this.parametrage).subscribe({
      next: () => {
        this.loading = false;
        this.chargerParametrage();
        this.chargerHistorique();
        alert('✅ Paramètres mis à jour');
      },
      error: () => {
        this.loading = false;
        alert('❌ Erreur lors de la mise à jour');
      }
    });
  }

}
