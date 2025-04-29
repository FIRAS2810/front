import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct
import { AdherentService } from './adherent.service';


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

  constructor(private http: HttpClient,private adherentService:AdherentService) {}

  login(email: string, motDePasse: string): Observable<LoginResponse> {
    const loginRequest: LoginRequest = { email, motDePasse };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginRequest);
  }

  getCinConnecte(): string | null {
    const token = localStorage.getItem('token');
    
    if (!token) return null;
  
    const decoded: any = jwtDecode(token);
    
  
    return decoded.cin || null; 
  }
  


  getEmailFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    const decoded: any = jwtDecode(token);
    return decoded.sub || decoded.email || null;
  }
  
  getCinFromBackend(): Observable<string> {
    const email = this.getEmailFromToken();
    return this.adherentService.getMonProfil(email!).pipe(
      map(profile => profile.cin) 
    );
  }
  
}
