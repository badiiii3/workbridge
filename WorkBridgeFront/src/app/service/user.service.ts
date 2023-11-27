import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:9090/api/test/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getEntrepriseBoard(): Observable<any> {
    return this.http.get(API_URL + 'entreprise', { responseType: 'text' });
  }
  
  getClientBoard(): Observable<any> {
    return this.http.get(API_URL + 'client', { responseType: 'text' });
  }

  getFreelancerBoard(): Observable<any> {
    return this.http.get(API_URL + 'freelancer', { responseType: 'text' });
  }
}