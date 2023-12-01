import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/model/project.model';
import { ProjectService } from 'src/app/service/project.service';
import { FileHandel } from 'src/app/model/file-handel.model';

import { format } from 'date-fns';

@Component({
  selector: 'app-add-new-project',
  templateUrl: './add-new-project.component.html',
  styleUrls: ['./add-new-project.component.css']
})
export class AddNewProjectComponent implements OnInit {
  date:String | undefined;  dateAujourdhui:String | undefined;

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

  constructor(private projectService: ProjectService, 
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.project = this.activatedRoute.snapshot.data['project'];

    if(this.project && this.project.projectId){
      this.isNewProject=false;
    }
    this.dateAujourdhui = format(new Date(), ' dd MMMM yyyy'); // for example, "Thursday, 16 November 2023 15:30:00"
  this.project.projectCreated=this.dateAujourdhui;
  }
 
  addProject(projectForm: NgForm){
    console.log("aman kharej des valeurs ",projectForm.value);
   
    const projectFormData = this.prepareFormData(this.project);

    
    this.projectService.addProject(projectFormData).subscribe(
      (response: Project)=>{
        projectForm.reset();
        this.project.projectImages = [];
        this.goToProjectList();
      },
      (error: HttpErrorResponse)=>{
        console.log("raouia raouia raouia",error)
      }
      );
    
  }
  goToProjectList() {
    this.router.navigate(['/showProjectByUser']);
  }

  prepareFormData(project: Project): FormData {
    console.log("prepare form data")
    const formData = new FormData();

    formData.append(
        'project',
        new Blob([JSON.stringify(project)], { type: 'application/json' })
    );

    console.log("resulatat", formData)

    // Utilisez la vérification de nullish pour projectImages
    const projectImages = project?.projectImages ?? [];

    for (var i = 0; i < projectImages.length; i++) {
        formData.append(
            'imageFile',
            projectImages[i]?.file,
            projectImages[i]?.file?.name || ''  // Utilisez une chaîne vide ou une valeur par défaut si le nom de fichier est nullish
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
      this.project = this.project || {};
      this.project.projectImages = this.project.projectImages || [];

      this.project.projectImages.push(fileHandle);
  }
}

 

  removeImages(i: number){
    this.project.projectImages.splice(i,1);
  }

  fileDropped(fileHandel : any) {
    this.project.projectImages.push(fileHandel);
  }

}