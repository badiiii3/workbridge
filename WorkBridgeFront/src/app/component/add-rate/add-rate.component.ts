import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandel } from 'src/app/model/file-handel.model';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Rate } from 'src/app/model/rate';
import { RateService } from 'src/app/service/rate.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-add-rate',
  templateUrl: './add-rate.component.html',
  styleUrls: ['./add-rate.component.css']
})
export class AddRateComponent implements OnInit{
  dateAujourdhui:any
  rate: Rate = {
    rateId: 0,

    date: "",
   etoile: 0,
 
 commentaire:"",
   freelance:null,
   client  : null
  };
  rateId:number =0 ;

user!:User
id!:number
  constructor(private rateService: RateService, 
    private sanitizer: DomSanitizer,
   
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.dateAujourdhui = format(new Date(), ' dd MMMM yyyy HH:mm:ss');
   this.user= this.route.snapshot.data['user'];
   console.log("user:", this.user);

 
  this.route.paramMap.subscribe(params => {
    this.id = Number(params.get('id'));

    console.log("id",this.id);
   
    
  });

   
  }
  ratee(){
    this.rate.etoile=this.rateId;
  }

  addRate(rateForm: NgForm){
    this.rate.date=this.dateAujourdhui;

    const rateFormData = this.prepareFormData(this.rate);
    const userId = localStorage.getItem("userId")!;
    console.log(localStorage.getItem("userId"));

    const id = this.route.snapshot.params['id'];
     this.rateService.addDemande(userId, id ,rateFormData).subscribe(
      (response: Rate)=>{
        rateForm.reset();
        this.goToDemandeList();
      },
      (error: HttpErrorResponse)=>{
        console.log(error)
      }
      );
    
  }
  goToDemandeList() {
    this.router.navigate(['/showProjectByUser']);
  }

 

 
  prepareFormData(demande: Rate): FormData {
   
    const formData = new FormData();

    formData.append(
        'demande',
        new Blob([JSON.stringify(demande)], { type: 'application/json' })
    );

    console.log("resulatat", formData)

    // Utilisez la vérification de nullish pour projectImages
   
    console.log("resulatat", formData)

    return formData;
}


}