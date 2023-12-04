import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from 'src/app/model/offer';




@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private httpClient: HttpClient) { }


  public addOffer(offer: FormData){
    return this.httpClient.post<Offer>("http://localhost:9090/addNewOffer", offer);
  }
  
  public updateOffer(offerId: number, formData: FormData) {
    return this.httpClient.put<Offer>(`http://localhost:9090/updateOffer/${offerId}`, formData);
  }


  public getAllOffers(pageNumber:any, searchKeyword: string= ""){
    return this.httpClient.get<Offer[]>("http://localhost:9090/getAllOffers?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }
 

  public getOfferDetailsById(offerId: any){
    return this.httpClient.get<Offer>("http://localhost:9090/getOfferDetailsById/"+offerId);
   }

  public deleteOffer(offerId: number){
   return this.httpClient.delete("http://localhost:9090/deleteOfferDetails/"+offerId);
  }

  public getOfferByUser(): Observable<Offer[]> {
    return this.httpClient.get<Offer[]>("http://localhost:9090/getOfferByUser");
  }
  public getOfferDetails(isSingeOfferCheckout:any,offerId:any){
    return this.httpClient.get<Offer[]>("http://localhost:9090/getOfferDetails/"+isSingeOfferCheckout+"/"+offerId);
   }


}