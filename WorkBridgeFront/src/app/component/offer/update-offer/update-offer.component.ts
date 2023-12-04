import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
  
  import { DomSanitizer } from '@angular/platform-browser';
  import { ActivatedRoute, Router } from '@angular/router';
  import { FileHandel } from 'src/app/model/file-handel.model';
  import { Offer } from 'src/app/model/offer';
  import { OfferService } from 'src/app/service/offer.service';
  
  @Component({
    selector: 'app-updat-eoffer',
    templateUrl: './update-offer.component.html',
    styleUrls: ['./update-offer.component.css']
  })
  export class UpdateofferComponent  implements OnInit {
    isNewOffer:boolean = true;
    offer: Offer = {
      offerId: 0,
      offerTitle: '',
      offerDescription: '',
      offerStatus: '',
      offerSkills: '',
      offerExperience: 0,
      offerContractType: '',
      offerSalary: 0,
      offerDeadline: '',
      offerLocation: '',
      offerImages: [],
      user: null,
      offerCreated: undefined
    };
    
  
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
     
      private offerService: OfferService, 
      private sanitizer: DomSanitizer,
    
    ) { }
  
  ngOnInit(): void {
    this.offer.offerId = +this.route.snapshot.params['id'];
  
    if (this.offer.offerId) {
      this.offerService.getOfferDetailsById(this.offer.offerId).subscribe(
        (data: Offer) => {
          this.offer = data; 
          console.log('Offer Details:', data);
        },
        (error: HttpErrorResponse) => console.error(error)
      );
    } else {
      this.isNewOffer = true;
    }
  }
  
  // Assurez-vous que la fonction onSubmit est correctement définie.
  onSubmit() {
    const formData = this.prepareFormData(this.offer);
  
    if (!formData) {
      console.error('Form data is null.');
      return;
    }
  
    if (this.isNewOffer) {
      this.offerService.addOffer(formData).subscribe(
        (data: Offer) => {
          console.log('Offer Details Response:', data);
          this.goToOfferList();
        },
        (error: HttpErrorResponse) => console.error(error)
      );
    } else {
      this.offerService.updateOffer(this.offer.offerId, formData).subscribe(
        (data: Offer) => {
          console.log('Offer Details Updated:', data);
          this.goToOfferList();
        },
        (error: HttpErrorResponse) => console.error('HTTP Error:', error)
      );
    }
  }
  
 
  prepareFormData(offer: Offer): FormData {
    const formData = new FormData();
  
    formData.append(
      'offer',
      new Blob([JSON.stringify(offer)], { type: 'application/json' })
    );
  
    for (let i = 0; i < offer.offerImages.length; i++) {
      formData.append(
        'imageFile',
        offer.offerImages[i].file,
        offer.offerImages[i].file.name
      );
    }
  
    return formData;
  }
  
  
    goToOfferList() {
      this.router.navigate(['/listOffers']);
    }
  
  
    onFileSelected(event: any) {
      if (event.target.files) {
        const file = event.target.files[0];
        const fileHandel: FileHandel = {
          file: file,
          url: this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(file)
          ),
        };
        this.offer.offerImages.push(fileHandel);
      }
    }
  
    removeImages(i: number) {
      this.offer.offerImages.splice(i, 1);
    }
  
    fileDropped(fileHandel: any) {
      this.offer.offerImages.push(fileHandel);
    }
  }
