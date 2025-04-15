import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-adherent-page',
  templateUrl: './adherent-page.component.html',
  styleUrl: './adherent-page.component.css'
})
export class AdherentPageComponent {
isSidebarClosed: boolean = false;
  
  nombreDemandesEnAttente: number = 0;

  constructor(private router: Router ) {}

  

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }
}
