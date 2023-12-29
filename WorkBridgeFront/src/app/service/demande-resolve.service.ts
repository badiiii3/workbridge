import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from './image-processing.service';
import { DemandeService } from './demande.service';
import { Demande } from '../model/demande.model';


@Injectable({
  providedIn: 'root'
})
export class DemandeResolveService implements Resolve<Demande>{

  constructor(private demandeService: DemandeService,
              private imageProcessingService: ImageProcessingService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id=route.paramMap.get("demandeId");

    if(id){
      return this.demandeService.getDemandeDetailsById(id)
              .pipe(
                map(p => this.imageProcessingService.createImages2(p))
              );
    }else{
      return of(this.getDemandeDetails());

    }

  }
  getDemandeDetails(){
    return {
        demandeId: null,
        montant: 0,
        duree_propose: 0,
        description: "",
        etat: "To Do",
        demandeImages: [],
        user :null ,
        project :null
   
        }
   }

}
