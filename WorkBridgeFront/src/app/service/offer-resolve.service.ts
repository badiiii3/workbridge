import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageProcessingofferService } from 'src/app/service/image-processingoffer.service';
import { Offer } from 'src/app/model/offer.model';
import { OfferService } from 'src/app/service/offer.service';


@Injectable({
  providedIn: 'root'
})
export class OfferResolveService implements Resolve<Offer>{

  constructor(private offerService: OfferService,
              private imageProcessingofferService: ImageProcessingofferService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id=route.paramMap.get("offerId");

    if(id){
      return this.offerService.getOfferDetailsById(id)
              .pipe(
                map(p => this.imageProcessingofferService.createImages(p))
              );
    }else{
      return of(this.getOfferDetails());

    }

  }
  getOfferDetails(){
    return {
   
      offerId: null,
      offerTitle: '',
      offerDescription: '',
      offerStatus: '',
      offerSkills: '',
      offerExperience: 0,
      offerContractType: '',
      offerSalary: 0,
      offerDeadline: '',
      offerLocation: '',
      offerImages:[],
      user:null  }
   }

}