import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ImageProcessingService } from 'src/app/image-processing.service';

import { map } from 'rxjs';
import { Servic } from '../../../model/servic';
import { ServiceService } from '../../../service/service.service';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {

  public title = 'Liste Services';
 
  pageNumber: number = 0;
  servicesDetails: Servic[] = [];
  showLoadButton = false;
  constructor(private serviceService: ServiceService,
    private imageProcessingService: ImageProcessingService,
    private router : Router,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
      this.getAllService();
  }
  public addService(): void {
    this.router.navigate(['/add-service']);
  }

  searchByKeyword(searchkeyword: any){
    this.pageNumber= 0;
    this.getAllService(searchkeyword);

  }
  public getAllService(searchKey: string = "") {
    this.serviceService.getAllService(this.pageNumber, searchKey)
      .pipe(
        map((x: Servic[], i) => x.map((servic: Servic) => this.imageProcessingService.createImages(servic)))
      )
      .subscribe(
        (resp: Servic[]) => {
          console.log(resp);
          if (resp.length === 8) {
            this.showLoadButton = true;
          } else {
            this.showLoadButton = false;
          }
         // this.servicesDetails=resp
          console.log(resp);
          
          resp.forEach(s => this.servicesDetails.push(s));
        }, 
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }
  deleteService(serviceId: number){
    this.serviceService.deleteService(serviceId).subscribe(
      (resp)=> {
        this.getAllService();
      },
      (error: HttpErrorResponse) => {
        console.log(error);}
    );    
  }
  updateService(serviceId: number){
    this.router.navigate(['/add-service', {serviceId: serviceId}])
  }

  
}

