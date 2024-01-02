import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from './image-processing.service';
import { ServiceService } from './service.service';
import { Servic } from '../model/servic.model';


@Injectable({
  providedIn: 'root'
})
export class ServiceResolverService implements Resolve<Servic[]>{

  constructor(private ServiceService: ServiceService, 
    private imageProcessingService: ImageProcessingService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Servic[] | Observable<Servic[]> | Promise<Servic[]> {
    const id= route.paramMap.get("id");
    const isSingleProductCheckout = route.paramMap.get("isSingleProductCheckout")
    return this.ServiceService.getServiceDetails(isSingleProductCheckout, id)
    .pipe(
      map(
        (x: Servic[], i)=> x.map((servic : Servic) => this.imageProcessingService.createImages1(servic))
      )
    );

  }
}
