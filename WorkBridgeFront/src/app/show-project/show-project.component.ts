import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { map } from 'rxjs';
import { Project } from 'src/app/model/project.model';
import { ImageProcessingService } from 'src/app/service/image-processing.service';
import { ProjectService } from 'src/app/service/project.service';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { ShowImagesDialogComponent } from '../show-images-dialog/show-images-dialog.component';

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.css']
})
export class ShowProjectComponent {
  displayedColumns: string[] = ['FirstName', 'LastName', 'Email', 'Emails' ,'Phone number','Actions'];

  showLoadMoreProductButton = false;
  showTable = false;
  pageNumber: number = 0;
  projectDetails : Project[] =[];
  showLoadButton = false;
  user!:User
 isNewUser !:boolean
  id!:number
  constructor(private projectService: ProjectService ,    private route: ActivatedRoute,

    public imagesDialog: MatDialog, private userService: UserService,
    private imageProcessingService: ImageProcessingService,
    private router: Router) { }

  ngOnInit(): void {
    this.user= this.route.snapshot.data['user'];
    console.log("user:", this.user);

  
   this.route.paramMap.subscribe(params => {
     this.id = Number(params.get('id'));

     console.log("id",this.id);
    
     
   });

   
  
  
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
    this.projectService.getAllProjectsUser(this.id,this.pageNumber, searchKey)
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
 

  showImages(product: Project){
    console.log(product);
    this.imagesDialog.open(ShowImagesDialogComponent, {
      data: {
        images: product.projectImages
      },
      height: '500px',
      width: '800px'
    });

  }

  updateProject(projectId: number) {
    // Navigate to the route designed for updating a project, pass projectId as a parameter
    this.router.navigate(['/update-project', projectId]);
  }
}
