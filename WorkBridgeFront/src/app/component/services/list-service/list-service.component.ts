import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { map } from 'rxjs';
import { ServiceService } from '../../../service/service.service';
import { ImageProcessingService } from 'src/app/service/image-processing.service';
import { Servic } from 'src/app/model/servic.model';

@Component({
  selector: 'app-list-service',
  templateUrl: './list-service.component.html',
  styleUrls: ['./list-service.component.css']
})
export class ListServiceComponent implements OnInit {

  public title = 'Liste Services';
  showLoadMoreProductButton = false;
  showTable = false;
  pageNumber: number = 0;
  servicesDetails: Servic[] = [];
  showLoadButton = false;
  constructor(private serviceService: ServiceService,
    private imageProcessingService: ImageProcessingService,
    private router : Router,
    ) { }

  ngOnInit(): void {
      this.getAllServiceUser();
  }
  public addService(): void {
    this.router.navigate(['/add-service']);
  }
  public updateService(serviceId: number){
    this.router.navigate(['/edit-service', serviceId]);
  }


  searchByKeyword(searchkeyword:any){

    this.pageNumber= 0;
    this.servicesDetails= [];
    this.getAllServiceUser(searchkeyword);

  }


  public getAllServiceUser(searchKey: string =""){
    this.showTable = false;
    const userId = localStorage.getItem("userId")!;
    this.serviceService.getAllServiceUser(userId,this.pageNumber, searchKey)
    .pipe(
      map((x: Servic[], i) => x.map((servic: Servic) => this.imageProcessingService.createImages1(servic)))
    )
    .subscribe(
      (resp: Servic[]) =>{
        console.log(resp);
        resp.forEach(servic => this.servicesDetails.push(servic));
        console.log(resp);

        this.showTable=true;
        if(resp.length==0){
          
          this.showLoadMoreProductButton=true;
        }else{
          this.showLoadMoreProductButton=false;
        }
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }

    );
  }

  deleteService(serviceId: number){
    this.serviceService.deleteService(serviceId).subscribe(
      (resp)=> {
        this.getAllServiceUser();
      },
      (error: HttpErrorResponse) => {
        console.log(error);}
    );    
  }
  
}

