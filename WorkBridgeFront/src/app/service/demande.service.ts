import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demande } from '../model/demande.model';




@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private httpClient: HttpClient) { }


  public addDemande(UserId: String, projectId: String , demande: FormData){
    return this.httpClient.post<Demande>(`http://localhost:9090/addNewDemande/${UserId}/${projectId}`, demande);
  }
  
  public updateDemandeEtat(demandeId: number, formData: FormData) {
    return this.httpClient.put<Demande>(`http://localhost:9090/updateDemandeEtat/${demandeId}`, formData);
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
