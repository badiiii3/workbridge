import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Servic } from '../model/servic.model';




@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient) { }


  public addService(UserId: String, service: FormData){
    return this.httpClient.post<Servic>(`http://localhost:9090/addNewService/${UserId}`, service);
  }
  
  public updateService(serviceId: number, formData: FormData) {
    return this.httpClient.put<Servic>(`http://localhost:9090/updateService/${serviceId}`, formData);
  }

  public getAllServiceUser(UserId: String,pageNumber:any, searchKeyword: String= ""){
    return this.httpClient.get<Servic[]>(`http://localhost:9090/getAllServicesUser/${UserId}?pageNumber=`+pageNumber+`&searchKey=`+searchKeyword);
  }

  public getServiceDetailsById(serviceId: any){
    return this.httpClient.get<Servic>("http://localhost:9090/getServiceDetailsById/"+serviceId);
   }



  public deleteService(serviceId: number){
   return this.httpClient.delete("http://localhost:9090/deleteServiceDetailes/"+serviceId);
  }
 
  public getServiceByUser(userId: string): Observable<Servic[]> {
    return this.httpClient.get<Servic[]>(`http://localhost:9090/getServiceByUser/${userId}`);
  }
  public getServiceDetails(isSingeServiceCheckout:any,serviceId:any){
    return this.httpClient.get<Servic[]>("http://localhost:9090/getServiceDetails/"+isSingeServiceCheckout+"/"+serviceId);
   }


}
