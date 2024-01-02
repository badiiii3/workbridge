import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';

const API_URL = 'http://localhost:9090/api/test/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://localhost:9090/update';

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getEntrepriseBoard(): Observable<any> {
    return this.http.get(API_URL + 'entreprise', { responseType: 'text' });
  }
  public getUserDetails(isSingeProjectCheckout:any,id:any){
    return this.http.get<User[]>("http://localhost:9090/getUserDetails/"+isSingeProjectCheckout+"/"+id);
   }
  getClientBoard(): Observable<any> {
    return this.http.get(API_URL + 'client', { responseType: 'text' });
  }

  getFreelancerBoard(): Observable<any> {
    return this.http.get(API_URL + 'freelancer', { responseType: 'text' });
  }
  public getUserDetailsById(id: any){
    return this.http.get<User>("http://localhost:9090/getUserDetailsById/"+id);
   }

  getUsersByRoles(role: string): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:9090/getUserDetailsByRole/"+role);
  }

  updateProfile(userName: any, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${userName}`, value);
  }

}