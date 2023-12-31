import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from './image-processing.service';
import { Project } from '../model/project.model';
import { ProjectService } from './project.service';
import { Rate } from '../model/rate';
import { RateService } from './rate.service';

@Injectable({
  providedIn: 'root'
})
export class RateResolveService implements Resolve<Rate>{

  constructor(private projectService: RateService,
              private imageProcessingService: ImageProcessingService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id=route.paramMap.get("projectId");

    if(id){
      return this.projectService.getDemandeDetailsById(id)
             
    }else{
      return of(this.getProjectDetails());

    }

  }
  getProjectDetails(){
    return {
   
         rateId: null,

          date: "",
         etoile: 0,
       
       commentaire:"",
         freelance:null,
         client  : null
         }
   }

}
