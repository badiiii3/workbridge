import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from './image-processing.service';
import { Servic } from './model/servic';
import { ServiceService } from './service/service.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceResolveService implements Resolve<Servic>{

  constructor(private serviceService: ServiceService,
              private imageProcessingService: ImageProcessingService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Servic> {
    const id=route.paramMap.get("serviceId");

    if(id){
      return this.serviceService.getServiceDetailsById(id)
              .pipe(
                map(p => this.imageProcessingService.createImages(p))
              );
    }else{
      return of(this.getServiceDetailss());

    }

  }

  getServiceDetailss(){
    return {
    serviceId: 0,
    nom: "",
    description: "",
    devis_Hrs:0,
    user: null,
    serviceImages:[],
    };
  }
 
}
