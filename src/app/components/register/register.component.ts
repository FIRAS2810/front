import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  cin: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  cinValide: boolean = false;
  errorMessage: boolean = false;

  constructor(private registerService: RegisterService, private router: Router) {}

  checkCIN() {
    this.registerService.verifierCIN(this.cin).subscribe({
      next: (valide) => {
        this.cinValide = valide;
        this.errorMessage = !valide;
      },
      error: () => {
        this.errorMessage = true;
      }
    });
  }

  register() {
    if (this.password.length >= 6 && this.password === this.confirmPassword) {
      this.registerService.enregistrerCompte(this.cin, this.email, this.password).subscribe({
        next: (res: any) => {
          console.log(res); // { message: '✅ Compte créé avec succès !' }
          Swal.fire({
            icon: 'success',
            title: 'Inscription réussie 🎉',
            text: res.message,
            confirmButtonText: 'OK',
            confirmButtonColor: '#198754'
          });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: err.error?.message || '❌ Une erreur s’est produite lors de l’inscription.'
          });
        }
      });
      
    } else {
      Swal.fire({
        title: 'Mot de passe invalide',
        text: 'Il doit contenir au moins 6 caractères et correspondre à la confirmation.',
        icon: 'warning',
        confirmButtonColor: '#ffc107'
      });
    }
  }
  
  

  goToHome() {
    this.router.navigate(['']);
  }
}
