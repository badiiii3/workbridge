import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servic } from '../model/servic';


@Injectable({
    providedIn: 'root'
  })
  export class ServiceService {

  public addService(service: FormData){
    return this.httpClient.post<Servic>("http://localhost:9090/addNewService", service);
  }

constructor(private httpClient: HttpClient) { }
public getAllService(pageNumber: any , searchKeyword: string= ""){
    return this.httpClient.get<Servic[]>("http://localhost:9090/getAllService?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }
 

public getServiceDetailsById(serviceId: any){
    return this.httpClient.get<Servic>("http://localhost:9090/getServiceDetailsById/"+serviceId);
   }
   public getServiceDetailss(isSingeProductCheckout :any,serviceId:any){
    return this.httpClient.get<Servic[]>("http://localhost:9090/getServiceDetails/"+isSingeProductCheckout+"/"+serviceId);
   }
   
  public deleteService(serviceId: number){
    return this.httpClient.delete("http://localhost:9090/deleteServiceDetailes/"+serviceId);
   }

   public updateService(serviceId: number, formData: FormData) {
    return this.httpClient.put<Servic>(`http://localhost:9090/updateService/${serviceId}`, formData);
  }

}
