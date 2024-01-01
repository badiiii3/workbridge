import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Demande } from 'src/app/model/demande.model';
import { DemandeService } from 'src/app/service/demande.service';
import { ImageProcessingService } from 'src/app/service/image-processing.service';
import { ShowDemandeImageDialogComponent } from 'src/app/component/demande/show-demande-image-dialog/show-demande-image-dialog.component';

@Component({
  selector: 'app-list-demande-client',
  templateUrl: './list-demande-client.component.html',
  styleUrls: ['./list-demande-client.component.css']
})
export class ListDemandeClientComponent {
  demande!: Demande ;
  public title = 'Liste Demande';
  showLoadMoreProductButton = false;
  showTable = false;
  pageNumber: number = 0;
  demandeDetails: Demande[] = [];
  showLoadButton = false;
  constructor(private demandeService: DemandeService,
    private imageProcessingService: ImageProcessingService,
    private router : Router,
    private route: ActivatedRoute,
    public imagesDialog: MatDialog,


    ) { }

  ngOnInit(): void {
      this.getDemandeByProject();
    
  }
  public accepter(demandeId: number) {
   
    this.demandeService.getDemandeDetailsById(demandeId).subscribe(
      (data: Demande) => {
        this.demande = data; // Assurez-vous que le modèle est correctement initialisé ici
        console.log('Project Details:', data);
      },
      (error: HttpErrorResponse) => console.error(error)
    );
    this.demande.etat='Valid';
    this.demandeService.updateDemande(demandeId, this.demande).subscribe( data =>{
    
    }
    , error => console.log(error));
  }

  public getDemandeByProject(){
    this.showTable = false;
    const projectId = this.route.snapshot.params['id'];

    this.demandeService.getDemandeByProject(projectId)
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
        this.getDemandeByProject();
      },
      (error: HttpErrorResponse) => {
        console.log(error);}
    );    
  }
  showImages(demande: Demande){
    console.log(demande);
    this.imagesDialog.open(ShowDemandeImageDialogComponent, {
      data: {
        images: demande.demandeImages
      },
      height: '500px',
      width: '800px'
    });

  }

}

