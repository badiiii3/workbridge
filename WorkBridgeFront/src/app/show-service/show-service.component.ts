import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs';
import { ImageProcessingService } from 'src/app/service/image-processing.service';
import { Servic } from 'src/app/model/servic.model';
import { ServiceService } from '../service/service.service';
import { User } from '../model/user';

@Component({
  selector: 'app-show-service',
  templateUrl: './show-service.component.html',
  styleUrls: ['./show-service.component.css']
})
export class ShowServiceComponent implements OnInit {
user!:User
  public title = 'Liste Services';
  showLoadMoreProductButton = false;
  showTable = false;
  pageNumber: number = 0;
  servicesDetails: Servic[] = [];
  showLoadButton = false;
  id:any;

  constructor(private serviceService: ServiceService,
    private imageProcessingService: ImageProcessingService,
    private router : Router,private route: ActivatedRoute,

    ) { }

  ngOnInit(): void {
    this.user= this.route.snapshot.data['user'];
    console.log("user:", this.user);

  
   this.route.paramMap.subscribe(params => {
     this.id = Number(params.get('id'));

     console.log("id",this.id);
    
     
   });

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
    this.serviceService.getAllServiceUser(this.id,this.pageNumber, searchKey)
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

