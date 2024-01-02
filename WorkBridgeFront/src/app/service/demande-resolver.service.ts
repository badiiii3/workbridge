import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from './image-processing.service';
import { Demande } from '../model/demande.model';
import { DemandeService } from './demande.service';



@Injectable({
  providedIn: 'root'
})
export class DemandeResolverService implements Resolve<Demande[]>{

  constructor(private demandeService: DemandeService, 
    private imageProcessingService: ImageProcessingService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Demande[] | Observable<Demande[]> | Promise<Demande[]> {
    const id= route.paramMap.get("id");
    const isSingleDemandeCheckout = route.paramMap.get("isSingleDemandeCheckout")
    return this.demandeService.getDemandeDetails(isSingleDemandeCheckout,id)
    .pipe(
      map(
        (x: Demande[], i)=> x.map((demande : Demande) => this.imageProcessingService.createImages2(demande))
      )
    );

  }
}