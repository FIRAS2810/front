import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    console.log('Guard : Token trouvé ?', !!token);
    console.log('Guard : Role trouvé ?', role);

    if (token && role === 'ADMIN') {
      console.log('Guard : Accès autorisé pour ADMIN');
      return true;
    }

    console.log('Guard : Accès refusé, redirection vers /login');
    this.router.navigate(['/login']);
    return false;
  }
}
