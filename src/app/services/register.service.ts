import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private API = 'http://localhost:8080/api/register';

  constructor(private http: HttpClient) {}

  verifierCIN(cin: string) {
    return this.http.get<boolean>(`${this.API}/verifier-cin/${cin}`);
  }

  enregistrerCompte(cin: string, email: string, motDePasse: string) {
    return this.http.post(`${this.API}/creer-compte`, {
      cin,
      email,
      motDePasse
    });
  }
}
