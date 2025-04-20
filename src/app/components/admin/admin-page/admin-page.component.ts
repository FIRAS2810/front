import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DemandeServiceService } from '../../../services/demande-service.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {
  isSidebarClosed: boolean = false;
  isSubMenuOpen: boolean = false;
  
  nombreDemandesEnAttente: number = 0;

  constructor(private router: Router ,private demandeService: DemandeServiceService) {}

  ngOnInit() {
    this.demandeService.getNombreDemandesEnAttente().subscribe({
      next: (data) => this.nombreDemandesEnAttente = data,
      error: (err) => console.error('❌ Erreur de récupération du nombre', err)
    });}

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }
}
