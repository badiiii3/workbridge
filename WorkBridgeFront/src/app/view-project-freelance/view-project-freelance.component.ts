import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Project } from 'src/app/model/project.model';
import { ImageProcessingService } from 'src/app/service/image-processing.service';
import { ProjectService } from 'src/app/service/project.service';


@Component({
  selector: 'app-view-project-freelance',
  templateUrl: './view-project-freelance.component.html',
  styleUrls: ['./view-project-freelance.component.css']
})
export class ViewProjectFreelanceComponent {
  showLoadMoreProductButton = false;
  showTable = false;
  pageNumber: number = 0;
  projectDetails : Project[] =[];
  showLoadButton = false;
  constructor(private projectService: ProjectService ,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllProjects();     
  }

  searchByKeyword(searchkeyword:any){

    this.pageNumber= 0;
    this.projectDetails= [];
    this.getAllProjects(searchkeyword);

  }
  public addService(): void {
    this.router.navigate(['/add-project']);
  }

  public getAllProjects(searchKey: string =""){
    this.showTable = false;
      this.projectService.getAllProjects(this.pageNumber, searchKey)
    .pipe(
      map((x: Project[], i) => x.map((project: Project) => this.imageProcessingService.createImages(project)))
    )
    .subscribe(
      (resp: Project[]) =>{
        console.log(resp);
        resp.forEach(project => this.projectDetails.push(project));
        this.showTable=true;
        if(resp.length==2){
          this.showLoadMoreProductButton=true;
        }else{
          this.showLoadMoreProductButton=false;
        }
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }

    );
  }
  loadMoreProject(){
    this.pageNumber= this.pageNumber+1;
    this.getAllProjects();
  }

  postuler(projectId: number) {
    // Navigate to the route designed for updating a project, pass projectId as a parameter
    this.router.navigate(['/postuler-project', projectId]);
  }
}
