import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { map } from 'rxjs';
import { Project } from 'src/app/model/project.model';
import { ImageProcessingService } from 'src/app/service/image-processing.service';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-view-project-by-user',
  templateUrl: './view-project-by-user.component.html',
  styleUrls: ['./view-project-by-user.component.css']
})
export class ViewProjectByUserComponent {
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
    this.projectService.getAllProjectsUser(this.pageNumber, searchKey)
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
        // this.productDetails = resp;
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }

    );
  }
  loadMoreProject(){
    this.pageNumber= this.pageNumber+1;
    this.getAllProjects();
  }

  deleteProject(projectId:number){
    this.projectService.deleteProject(projectId).subscribe(
      (resp)=> {
        this.getAllProjects();
      },
      (error: HttpErrorResponse) => {
        console.log(error);}
    );    
  }
  get projectsInRows(): Project[][] {
    const projectsCopy = [...this.projectDetails];
    const projectsInRows: Project[][] = [];

    while (projectsCopy.length > 0) {
      projectsInRows.push(projectsCopy.splice(0, 3));
    }

    return projectsInRows;
  }
/*
  showImages(product: Product){
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    });

  }*/

  updateProject(projectId: number) {
    // Navigate to the route designed for updating a project, pass projectId as a parameter
    this.router.navigate(['/update-project', projectId]);
  }
}
