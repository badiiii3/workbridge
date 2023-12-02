import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from './image-processing.service';
import { Project } from '../model/project.model';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectResolveService implements Resolve<Project>{

  constructor(private projectService: ProjectService,
              private imageProcessingService: ImageProcessingService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id=route.paramMap.get("projectId");

    if(id){
      return this.projectService.getProjectDetailsById(id)
              .pipe(
                map(p => this.imageProcessingService.createImages(p))
              );
    }else{
      return of(this.getProjectDetails());

    }

  }
  getProjectDetails(){
    return {
   
         projectId: null,
         projectName: "",
         projectDescription: "",
         projectCreated: "",
         projectDuration: 0,
         projectDomain:"",
         projectState:"To Do",
         projectTechnology:"",
         projectImages: [],
         user :null  }
   }

}
