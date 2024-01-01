import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demande } from '../model/demande.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private httpClient: HttpClient) { }
  private baseUrl = 'http://localhost:9090/updateDemandeEtat'

  public addDemande(UserId: String, projectId: String , demande: FormData){
    return this.httpClient.post<Demande>(`http://localhost:9090/addNewDemande/${UserId}/${projectId}`, demande);
  }
  
  
  updateDemande(demandeId: any, value: any): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/${demandeId}`, value);
  }
  
  

  public getDemandeDetailsById(demandeId: any){
    return this.httpClient.get<Demande>("http://localhost:9090/getDemandeDetailsById/"+demandeId);
   }
  public getDemandeByProject(projectId: String){
    return this.httpClient.get<Demande[]>(`http://localhost:9090/getDemandeByProject/${projectId}`);
  }
  public getDemandeByFreelance(userId: String){
    return this.httpClient.get<Demande[]>(`http://localhost:9090/getDemandeByFreelance/${userId}`);
  }

  public getDemandeDetails(isSingeDemandeCheckout:any,demandeId:any){
    return this.httpClient.get<Demande[]>("http://localhost:9090/getDemandeDetails/"+isSingeDemandeCheckout+"/"+demandeId);
   }


  public deleteDemandeDetailes(demandeId: number){
   return this.httpClient.delete("http://localhost:9090/deleteDemandeDetailes/"+demandeId);
  }
 }
