import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';

constructor(private authService: AuthService,private router: Router) {}

onLogin() {
  this.authService.login(this.email, this.password).subscribe({
    next: (response) => {
      // Enregistre le token et le rôle dans localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role); 
      localStorage.setItem('email', this.email);
// Important pour que le guard fonctionne
      console.log('Connexion réussie : ', response.role);

      // Redirige l'utilisateur en fonction de son rôle
      if (response.role === 'ADMIN') {
        this.router.navigate(['/admin-page']);
      } else {
        this.router.navigate(['/adherent-page/profil-adherent']);
      }
    },
    error: (err) => {
      console.error('Erreur de connexion', err);
      this.errorMessage = 'Email ou mot de passe incorrect.';
    }
  });
}


}
