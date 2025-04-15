import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdherentGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    console.log('Guard Adhérent : Token trouvé ?', !!token);
    console.log('Guard Adhérent : Role trouvé ?', role);

    if (token && role === 'ADHERENT') {
      console.log('Guard Adhérent : Accès autorisé pour ADHERENT');
      return true;
    }

    console.log('Guard Adhérent : Accès refusé, redirection vers /login');
    this.router.navigate(['/login']);
    return false;
  }
}
