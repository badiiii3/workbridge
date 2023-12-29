import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Demande } from 'src/app/model/demande.model';
import { FileHandel } from 'src/app/model/file-handel.model';
import { DemandeService } from 'src/app/service/demande.service';

@Component({
  selector: 'app-add-demande',
  templateUrl: './add-demande.component.html',
  styleUrls: ['./add-demande.component.css']
})
export class AddDemandeComponent {

  demande: Demande = {
    demandeId: 0,
    montant: 0,
    duree_propose: 0,
    description: "",
    etat: "To Do",
    demandeImages: [],
    user :null ,
    project :null
  };

  constructor(private demandeService: DemandeService, 
    private sanitizer: DomSanitizer,
   
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
   
  }
 
  addDemande(demandeForm: NgForm){
    const demandeFormData = this.prepareFormData(this.demande);
    const userId = localStorage.getItem("userId")!;
    console.log(localStorage.getItem("userId"));
    const projectId = this.route.snapshot.params['id'];
    this.demandeService.addDemande(userId, projectId ,demandeFormData).subscribe(
      (response: Demande)=>{
        demandeForm.reset();
        this.demande.demandeImages = [];
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

  prepareFormData(demande: Demande): FormData {
   
    const formData = new FormData();

    formData.append(
        'demande',
        new Blob([JSON.stringify(demande)], { type: 'application/json' })
    );

    console.log("resulatat", formData)

    // Utilisez la vérification de nullish pour projectImages
    const demandeImages = demande?.demandeImages ?? [];

    for (var i = 0; i < demandeImages.length; i++) {
        formData.append(
            'imageFile',
            demandeImages[i]?.file,
            demandeImages[i]?.file?.name || ''  // Utilisez une chaîne vide ou une valeur par défaut si le nom de fichier est nullish
        );
    }
    console.log("resulatat", formData)

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
      this.demande = this.demande || {};
      this.demande.demandeImages = this.demande.demandeImages || [];

      this.demande.demandeImages.push(fileHandle);
  }
}

 

  removeImages(i: number){
    this.demande.demandeImages.splice(i,1);
  }

  fileDropped(fileHandel : any) {
    this.demande.demandeImages.push(fileHandel);
  }

}
