import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // ✅ à importer
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotisationServiceService {

  private API = 'http://localhost:8080/api'; // ✅ adapte selon ton backend

  constructor(private http: HttpClient) {} // ✅ injection ici

  getCotisationsByEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/cotisations/par-email/${email}`);

  }
}
