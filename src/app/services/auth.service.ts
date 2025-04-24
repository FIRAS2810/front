import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct


export interface LoginRequest {
  email: string;
  motDePasse: string;
}

export interface LoginResponse {
  token: string;
  role: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth'; // Backend URL

  constructor(private http: HttpClient) {}

  login(email: string, motDePasse: string): Observable<LoginResponse> {
    const loginRequest: LoginRequest = { email, motDePasse };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginRequest);
  }

  getCinConnecte(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decoded: any = jwtDecode(token);
    return decoded.cin || null; // Assure-toi que le champ s'appelle bien 'cin' dans le token
  }


  getEmailFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    const decoded: any = jwtDecode(token);
    return decoded.sub || decoded.email || null;
  }
  
  
}
