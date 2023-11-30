import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FileHandel } from 'src/app/model/file-handel.model';
import { Servic } from 'src/app/model/servic';
import { ServiceService } from 'src/app/service/service.service';


@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  isNewService = true;
  servic: Servic = {
    serviceId: 0,
    nom: "",
    description: "",
    devis_Hrs:0,
    user: null,
    serviceImages:[],
  }
  router: any;

  public listService(): void {
    this.router.navigate(['/list-service']);
  }
  constructor(private serviceService: ServiceService, 
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.servic = this.activatedRoute.snapshot.data['service'];

    if(this.servic && this.servic.serviceId){
      this.isNewService=false;
    }


  }

  addServices(serviceForm: NgForm){
    const serviceFormData = this.prepareFormData(this.servic);
    this.serviceService.addService(serviceFormData).subscribe(
      (response: Servic)=>{
        serviceForm.reset();
        this.servic.serviceImages = [];
      },
      (error: HttpErrorResponse)=>{
        console.log(error)
      }
      );
    
  }

  prepareFormData(servic: Servic): FormData {
    const formData = new FormData();

    formData.append(
      'service',
      new Blob([JSON.stringify(servic)], {type: 'application/json'})
    );

    for(var i=0; i<servic.serviceImages.length; i++){
      formData.append(
        'imageFile',
        servic.serviceImages[i].file,
        servic.serviceImages[i].file.name
      );
    }

    return formData;
  } 

  onFileSelected(event: any){
    if(event.target.files){
      const file= event.target.files[0];
      const fileHandel: FileHandel ={
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };
      this.servic.serviceImages.push(fileHandel);
    }
  }

  removeImages(i: number){
    this.servic.serviceImages.splice(i,1);
  }

  fileDropped(fileHandel : any) {
    this.servic.serviceImages.push(fileHandel);
  }

}
