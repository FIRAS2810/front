import { Component, OnInit } from '@angular/core';
import { DashboardServiceService, DashboardStatsDTO } from '../../../services/dashboard-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  stats!: DashboardStatsDTO;
  loading = true;

  repartitionAgeBar: any;
  optionsBar: any;
  
  popupVisible = false;

  repartitionSexe: any;
  repartitionAge: any;

  constructor(private dashboardService: DashboardServiceService) {}

  ngOnInit() {
    this.dashboardService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.initCharts();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Erreur de chargement des stats');
      }
    });
  }

  openPopup() {
    this.popupVisible = true;  // Affiche le pop-up
  }

  closePopup() {
    this.popupVisible = false;  // Masque le pop-up
  }

  initCharts() {
    // 🍩 Répartition par sexe
    this.repartitionSexe = {
      labels: ['Hommes', 'Femmes'],
      datasets: [{
        data: [this.stats.nbHommes, this.stats.nbFemmes],
        backgroundColor: ['#42A5F5', '#66BB6A']
      }]
    };
  
    // 📊 Répartition par âge → en bar chart avec 3 tranches
    this.repartitionAgeBar = {
      labels: ['< 30 ans', '30–50 ans', '> 50 ans'],
      datasets: [{
        label: 'Adhérents',
        backgroundColor: '#4CAF50',
        data: [
          this.stats.nbMoins30,
          this.stats.nbEntre30et50,
          this.stats.nbPlus50
        ]
      }]
    };

    
  }
  
}
