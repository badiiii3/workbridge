import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Demande } from 'src/app/model/demande.model';
import { DemandeService } from 'src/app/service/demande.service';
import { ImageProcessingService } from 'src/app/service/image-processing.service';

@Component({
  selector: 'app-list-demande-freelance',
  templateUrl: './list-demande-freelance.component.html',
  styleUrls: ['./list-demande-freelance.component.css']
})
export class ListDemandeFreelanceComponent {

  public title = 'Liste Demande';
  showLoadMoreProductButton = false;
  showTable = false;
  pageNumber: number = 0;
  demandeDetails: Demande[] = [];
  showLoadButton = false;
  constructor(private demandeService: DemandeService,
    private imageProcessingService: ImageProcessingService,
    private router : Router,
    ) { }

  ngOnInit(): void {
      this.getDemandeByFreelance();
  }




  public getDemandeByFreelance(){
    this.showTable = false;
    const userId = localStorage.getItem("userId")!;
    this.demandeService.getDemandeByFreelance(userId)
    .pipe(
      map((x: Demande[], i) => x.map((demande: Demande) => this.imageProcessingService.createImages2(demande)))
    )
    .subscribe(
      (resp: Demande[]) =>{
        console.log(resp);
        resp.forEach(demande => this.demandeDetails.push(demande));
        console.log(resp);

        this.showTable=true;
        if(resp.length==0){
          
          this.showLoadMoreProductButton=true;
        }else{
          this.showLoadMoreProductButton=false;
        }
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }

    );
  }

  deleteDemande(demandeId: number){
    this.demandeService.deleteDemandeDetailes(demandeId).subscribe(
      (resp)=> {
        this.getDemandeByFreelance();
      },
      (error: HttpErrorResponse) => {
        console.log(error);}
    );    
  }
}
