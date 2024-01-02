import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from './image-processing.service';
import { Project } from '../model/project.model';
import { ProjectService } from './project.service';
import { Rate } from '../model/rate';
import { RateService } from './rate.service';


@Injectable({
  providedIn: 'root'
})
export class RateResolverService implements Resolve<Rate[]>{

  constructor(private projectService: RateService, 
    private imageProcessingService: ImageProcessingService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Rate[] | Observable<Rate[]> | Promise<Rate[]> {
    const id= route.paramMap.get("id");
    const isSingleProjectCheckout = route.paramMap.get("isSingleProjectCheckout")
    return this.projectService.getDemandeDetails(isSingleProjectCheckout,id)
    
  }
}