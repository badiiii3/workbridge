import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ImageProcessingService } from 'src/app/service/imageprocessing.service';

import { map } from 'rxjs';
import { OfferService } from 'src/app/service/offer.service';
import { Offer } from 'src/app/model/offer';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.css']
})
export class ListOffersComponent implements OnInit {

  public title = 'Liste Offers';
 
  pageNumber: number = 0;
  offersDetails: Offer[] = [];
  showLoadButton = false;
  constructor(private offerService: OfferService,
    private imageProcessingService: ImageProcessingService,
    private router : Router,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
      this.getAllOffers();
  }
  public addOffer(): void {
    this.router.navigate(['/add-offer']);
  }
  public updateOffer(offerId: number){
    this.router.navigate(['/update-offer', offerId]);
  }
  searchByKeyword(searchkeyword: any){
    this.pageNumber= 0;
    this.getAllOffers(searchkeyword);

  }
  public getAllOffers(searchKey: string = "") {
    this.offerService.getAllOffers(this.pageNumber, searchKey)
      .pipe(
        map((x: Offer[], i) => x.map((offer: Offer) => this.imageProcessingService.createImages(offer)))
      )
      .subscribe(
        (resp: Offer[]) => {
          console.log(resp);
          if (resp.length === 8) {
            this.showLoadButton = true;
          } else {
            this.showLoadButton = false;
          }
         // this.offersDetails=resp
          console.log(resp);
          
          resp.forEach(s => this.offersDetails.push(s));
        }, 
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }
  deleteOffer(offerId: number){
    this.offerService.deleteOffer(offerId).subscribe(
      (resp)=> {
        this.getAllOffers();
      },
      (error: HttpErrorResponse) => {
        console.log(error);}
    );    
  }


  
}