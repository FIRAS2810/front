import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DescriptionService {
  private baseUrl = 'http://localhost:8080/api/description';

  constructor(private http: HttpClient) {}

  getDescription() {
    return this.http.get<{ contenuHtml: string }>('http://localhost:8080/api/description');
  }
  

  updateDescription(html: string) {
    return this.http.put('http://localhost:8080/api/description', {
      contenuHtml: html
    });
  }
  
}
