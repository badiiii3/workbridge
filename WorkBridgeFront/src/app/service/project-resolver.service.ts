import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from './image-processing.service';
import { Project } from '../model/project.model';
import { ProjectService } from './project.service';


@Injectable({
  providedIn: 'root'
})
export class ProjectResolverService implements Resolve<Project[]>{

  constructor(private projectService: ProjectService, 
    private imageProcessingService: ImageProcessingService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Project[] | Observable<Project[]> | Promise<Project[]> {
    const id= route.paramMap.get("id");
    const isSingleProjectCheckout = route.paramMap.get("isSingleProjectCheckout")
    return this.projectService.getProjectDetails(isSingleProjectCheckout,id)
    .pipe(
      map(
        (x: Project[], i)=> x.map((project : Project) => this.imageProcessingService.createImages(project))
      )
    );

  }
}