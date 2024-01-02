import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandel } from 'src/app/model/file-handel.model';
import { Project } from 'src/app/model/project.model';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  isNewProject:boolean = true;
  project: Project = {
    projectId: 0,
    projectName: "",
    projectDescription: "",
    projectCreated: "",
    projectDuration: 0,
    projectDomain: "",
    projectState: "To do",
    projectTechnology: "",
    projectImages: [],
    user: null,
  };


  constructor(
    private route: ActivatedRoute,
    private router: Router,
   
    private projectService: ProjectService, 
    private sanitizer: DomSanitizer,
  
  ) { }
// Assurez-vous que la logique de récupération des détails du service est correcte.
ngOnInit(): void {
  this.project.projectId = +this.route.snapshot.params['id'];

  if (this.project.projectId) {
    this.projectService.getProjectDetailsById(this.project.projectId).subscribe(
      (data: Project) => {
        this.project = data; // Assurez-vous que le modèle est correctement initialisé ici
        console.log('Project Details:', data);
      },
      (error: HttpErrorResponse) => console.error(error)
    );
  } else {
    this.isNewProject = true;
  }
}

// Assurez-vous que la fonction onSubmit est correctement définie.
onSubmit() {
  const formData = this.prepareFormData(this.project);
  const userId = localStorage.getItem("userId")!;

  if (!formData) {
    console.error('Form data is null.');
    return;
  }

  if (this.isNewProject) {
    this.projectService.addProject(userId,formData).subscribe(
      (data: Project) => {
        console.log('Project Details Response:', data);
        this.goToProjectList();
      },
      (error: HttpErrorResponse) => console.error(error)
    );
  } else {
    this.projectService.updateProject(this.project.projectId, formData).subscribe(
      (data: Project) => {
        console.log('Project Details Updated:', data);
        this.goToProjectList();
      },
      (error: HttpErrorResponse) => console.error('HTTP Error:', error)
    );
  }
}

// Assurez-vous que la logique de préparation des données FormData est correcte.
prepareFormData(project: Project): FormData {
  const formData = new FormData();

  formData.append(
    'project',
    new Blob([JSON.stringify(project)], { type: 'application/json' })
  );

  for (let i = 0; i < project.projectImages.length; i++) {
    formData.append(
      'imageFile',
      project.projectImages[i].file,
      project.projectImages[i].file.name
    );
  }

  return formData;
}


  goToProjectList() {
    this.router.navigate(['/showProjectByUser']);
  }


  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileHandel: FileHandel = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ) as SafeUrl,
      };
      this.project.projectImages.push(fileHandel);
    }
  }

  removeImages(i: number) {
    this.project.projectImages.splice(i, 1);
  }

  fileDropped(fileHandel: any) {
    this.project.projectImages.push(fileHandel);
  }

  onImageLoad(event: Event, file: any) {
    console.log('Image loaded:', event);
    console.log('File details:', file);
}

}