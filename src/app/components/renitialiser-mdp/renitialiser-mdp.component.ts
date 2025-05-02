import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-renitialiser-mdp',
  templateUrl: './renitialiser-mdp.component.html',
  styleUrl: './renitialiser-mdp.component.css'
})
export class RenitialiserMdpComponent {

  etape: number = 1;
  email: string = '';
  code: string = '';
  newPassword: string = '';

  constructor(private http: HttpClient, private messageService: MessageService,private router:Router) {}

  envoyerCode() {
    if (!this.email) return this.toastError('Veuillez entrer un email valide.');

    this.http.post('http://localhost:8080/api/auth/demander-reset', { email: this.email })
      .subscribe({
        next: () => {
          this.toastSuccess('📨 Code envoyé à votre email.');
          this.etape = 2;
        },
        error: () => this.toastError('❌ Email introuvable.')
      });
  }

  resetPassword() {
    if (!this.code || !this.newPassword) {
      return this.toastError('Veuillez remplir tous les champs.');
    }
  
    this.http.post('http://localhost:8080/api/auth/reset-password', {
      email: this.email,
      code: this.code,
      newPassword: this.newPassword
    }).subscribe({
      next: () => {
        this.toastSuccess('✅ Mot de passe réinitialisé avec succès ! Redirection...');
  
        // ⏳ petite pause pour laisser le toast apparaître
        setTimeout(() => {
          this.etape = 1;
          this.code = '';
          this.newPassword = '';
          this.router.navigate(['/login']); 
        }, 500);
      },
      error: err => {
        if (err.status === 410) {
          this.toastError('⏰ Code expiré.');
        } else {
          this.toastError('❌ Code invalide ou erreur serveur.');
        }
      }
    });
  }
  
  toastSuccess(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: msg });
  }

  toastError(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: msg });
  }

  verifierCode() {
    this.http.post('http://localhost:8080/api/auth/verifier-code', {
      email: this.email,
      code: this.code
    }).subscribe({
      next: () => {
        this.toastSuccess('✅ Code vérifié. Entrez un nouveau mot de passe.');
        this.etape = 3;
      },
      error: () => this.toastError('❌ Code invalide ou expiré.')
    });
  }
  
}
