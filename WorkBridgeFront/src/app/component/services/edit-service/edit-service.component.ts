import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { FileHandel } from '../../../model/file-handel.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Servic } from 'src/app/model/servic.model';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {
  servic: Servic = {
    serviceId: 0,
    nom: "",
    description: "",
    devis_Hrs: 0,
    user: null,
    serviceImages: [],
  };
  isNewService: boolean = false;

  constructor(
    private serviceService: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }
// Assurez-vous que la logique de récupération des détails du service est correcte.
ngOnInit(): void {
  this.servic.serviceId = +this.route.snapshot.params['id'];
  const userId = localStorage.getItem("userId")!;
  console.log(localStorage.getItem("userId"));
  if (this.servic.serviceId) {
    this.serviceService.getServiceDetailsById( this.servic.serviceId).subscribe(
      (data: Servic) => {
        this.servic = data; // Assurez-vous que le modèle est correctement initialisé ici
        console.log('Service Details:', data);
      },
      (error: HttpErrorResponse) => console.error(error)
    );
  } else {
    this.isNewService = true;
  }
}

// Assurez-vous que la fonction onSubmit est correctement définie.
onSubmit() {
  const formData = this.prepareFormData(this.servic);

  if (!formData) {
    console.error('Form data is null.');
    return;
  }

  if (this.isNewService) {
    const userId = localStorage.getItem("userId")!;
    console.log(localStorage.getItem("userId"));
    this.serviceService.addService(userId ,formData).subscribe(
      (data: Servic) => {
        console.log('Service Details Response:', data);
        this.goToServiceList();
      },
      (error: HttpErrorResponse) => console.error(error)
    );
  } else {
    this.serviceService.updateService(this.servic.serviceId, formData).subscribe(
      (data: Servic) => {
        console.log('Service Details Updated:', data);
        this.goToServiceList();
      },
      (error: HttpErrorResponse) => console.error('HTTP Error:', error)
    );
  }
}

prepareFormData(servic: Servic): FormData {
  console.log(this.serviceService.updateService);  // Log the value to the console

  const formData = new FormData();

  formData.append(
    'service',
    new Blob([JSON.stringify(servic)], { type: 'application/json' })
  );

  for (let i = 0; i < servic.serviceImages.length; i++) {
    const image = servic.serviceImages[i];
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


  goToServiceList() {
    this.router.navigate(['/list-service']);
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
      this.servic.serviceImages.push(fileHandel);
    }
  }

  removeImages(i: number) {
    this.servic.serviceImages.splice(i, 1);
  }

  fileDropped(fileHandel: any) {
    this.servic.serviceImages.push(fileHandel);
  }
}
