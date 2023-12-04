import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from 'src/app/service/imageprocessing.service';
import { Offer } from 'src/app/model/offer';
import { OfferService } from 'src/app/service/offer.service';


@Injectable({
  providedIn: 'root'
})
export class OfferResolverService implements Resolve<Offer[]>{

  constructor(private offerService: OfferService, 
    private imageProcessingService: ImageProcessingService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Offer[] | Observable<Offer[]> | Promise<Offer[]> {
    const id= route.paramMap.get("id");
    const isSingleOfferCheckout = route.paramMap.get("isSingleOfferCheckout")
    return this.offerService.getOfferDetails(isSingleOfferCheckout,id)
    .pipe(
      map(
        (x: Offer[], i)=> x.map((offer : Offer) => this.imageProcessingService.createImages(offer))
      )
    );

  }
}