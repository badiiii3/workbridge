import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from 'src/app/service/offer.service';
import { Offer } from 'src/app/model/offer';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandel } from 'src/app/model/file-handel.model';
@Component({
  selector: 'app-add-new-offer',
  templateUrl: './add-new-offer.component.html',
  styleUrls: ['./add-new-offer.component.css']
})
export class AddNewOfferComponent {
  //date:String | undefined;  dateAujourdhui:String | undefined;
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

    constructor(private offerService: OfferService, 
      private sanitizer: DomSanitizer,
      private activatedRoute: ActivatedRoute,
      private router: Router,
    ) { }
  
    ngOnInit(): void {
      this.offer = this.activatedRoute.snapshot.data['offer'];
  
      if(this.offer && this.offer.offerId){
        this.isNewOffer=false;
      }
     //this.dateAujourdhui = format(new Date(), ' dd MMMM yyyy'); // for example, "Thursday, 16 November 2023 15:30:00"
    //this.offer.offerCreated=this.dateAujourdhui;
    }
   
    addOffer(offerForm: NgForm){
      console.log("aman kharej des valeurs ",offerForm.value);
     
      const offerFormData = this.prepareFormData(this.offer);
  
      
      this.offerService.addOffer(offerFormData).subscribe(
        (response: Offer)=>{
          offerForm.reset();
          this.offer.offerImages = [];
          this.goToOfferList();
        },
        (error: HttpErrorResponse)=>{
          console.log("nada",error)
        }
        );
      
    }
    goToOfferList() {
      this.router.navigate(['/ListOffers']);
    }
  
    prepareFormData(offer: Offer): FormData {
      console.log("prepare form data")
      const formData = new FormData();
  
      formData.append(
          'offer',
          new Blob([JSON.stringify(offer)], { type: 'application/json' })
      );
  
      console.log("resultat", formData)
  
      // Utilisez la vérification de nullish pour offerImages
      const offerImages = offer?.offerImages ?? [];
  
      for (var i = 0; i < offerImages.length; i++) {
          formData.append(
              'imageFile',
              offerImages[i]?.file,
              offerImages[i]?.file?.name || ''  // Utilisez une chaîne vide ou une valeur par défaut si le nom de fichier est nullish
          );
      }
      console.log("resultat", formData)
  
      return formData;
  }
  onFileSelected(event: any) {
    if (event.target.files) {
        const file = event.target.files[0];
        const fileHandle: FileHandel = {
            file: file,
            url: this.sanitizer.bypassSecurityTrustUrl(
                window.URL.createObjectURL(file)
            ),
        };
  
        // Utilisez la vérification de nullish pour project et projectImages
        this.offer = this.offer || {};
        this.offer.offerImages = this.offer.offerImages || [];
  
        this.offer.offerImages.push(fileHandle);
    }
  }
  
   
  
    removeImages(i: number){
      this.offer.offerImages.splice(i,1);
    }
  
    fileDropped(fileHandel : any) {
      this.offer.offerImages.push(fileHandel);
    }
  
  }