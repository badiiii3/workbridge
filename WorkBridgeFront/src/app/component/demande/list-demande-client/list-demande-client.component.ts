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
  demande: any ;
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
  public accepter(demandeId: number){
     this.demande.etat = "valid";

    
    this.demandeService.getDemandeDetailsById(demandeId).subscribe(
      (data: Demande) => {
        this.demande = data;
        console.log('demande Details:', this.demande);

      },
      (error: HttpErrorResponse) => console.error(error)
    );
    const formData = this.prepareFormData(this.demande);

  //  this.demande.etat = "valid";
    console.log("test valid" , this.demande);
    this.demandeService.updateDemandeEtat(demandeId , formData).subscribe(
        (data: Demande) => {
        console.log('Demande Details Updated:', data);
     },
        (error: HttpErrorResponse) => console.error('HTTP Error:', error)
     );
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
  prepareFormData(demande: Demande): FormData {
    console.log(this.demandeService.updateDemandeEtat);  // Log the value to the console
  
    const formData = new FormData();
  
    formData.append(
      'service',
      new Blob([JSON.stringify(demande)], { type: 'application/json' })
    );
  
    for (let i = 0; i < demande.demandeImages.length; i++) {
      const image = demande.demandeImages[i];
      if (image && image.file) {
        formData.append(
          'imageFile',
          image.file,
          image.file.name || 'defaultFileName'  // Utilisez un nom par défaut si le nom du fichier est indéfini
        );
      }
    }
  
    return formData;
  }
}

