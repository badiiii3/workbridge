import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rate } from '../model/rate';




@Injectable({
  providedIn: 'root'
})
export class RateService {

  constructor(private httpClient: HttpClient) { }


  public addDemande(UserId: String, userid: String , demande: FormData){
    return this.httpClient.post<Rate>(`http://localhost:9090/addrate/${UserId}/${userid}`, demande);
  }
  
 
 
  public getDemandeByProject(projectId: String){
    return this.httpClient.get<Rate[]>(`http://localhost:9090/getRateByClient/${projectId}`);
  }
  public getDemandeByFreelance(userId: String){
    return this.httpClient.get<Rate[]>(`http://localhost:9090/getRateByFreelance/${userId}`);
  }

  public getDemandeDetails(isSingeDemandeCheckout:any,demandeId:any){
    return this.httpClient.get<Rate[]>("http://localhost:9090/getRateDetails/"+isSingeDemandeCheckout+"/"+demandeId);
   }


  public deleteDemandeDetailes(demandeId: number){
   return this.httpClient.delete("http://localhost:9090/deleteDemandeDetailes/"+demandeId);
  }
 



}