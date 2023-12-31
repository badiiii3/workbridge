import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { RateService } from '../service/rate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { Rate } from '../model/rate';

@Component({
  selector: 'app-show-rate',
  templateUrl: './show-rate.component.html',
  styleUrls: ['./show-rate.component.css']
})
export class ShowRateComponent {
  rates!: Rate[];
  rate!:number;

 user!:User;
 id:any;
  constructor(private productService: UserService , private rateService : RateService,private route: ActivatedRoute,

    private router: Router) { }
  ngOnInit(): void {
    this.user= this.route.snapshot.data['user'];
    console.log("user:", this.user);

  
   this.route.paramMap.subscribe(params => {
     this.id = Number(params.get('id'));

     console.log("id",this.id);
    
     this.getAllUser();
   });



  }
  public getAllUser() {
    this.rateService.getDemandeByProject(this.id).subscribe(
      (resp: Rate[]) => {
        console.log(resp);
        this.rates= resp;
      }, (err) => {
        console.log(err);
      }
    )
  }


}
