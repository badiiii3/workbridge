import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/service/user.service';
import { RateService } from 'src/app/service/rate.service';
import { User } from 'src/app/model/user';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  roles = ['ENTREPRISE', 'CLIENT', 'FREELANCER'];
  selectedRole: string | null = null;
  productDetails: User[] = [];
  displayedColumns: string[] = ['FirstName', 'LastName', 'Email', 'Phone number', 'Actions'];
  role!: string;
  showLoadMoreProductButton!: boolean;
  showTable!: boolean;

  constructor(private userService: UserService, private rateService: RateService, private router: Router) { }

  ngOnInit(): void {
    this.getAllUser(this.role);
  }

  projet(id: number) {
    this.router.navigate(['/user-project', id]);
  }

  service(id: number) {
    this.router.navigate(['/user-service', id]);
  }

  deleteUser(id: any) {
   /* if (window.confirm('Are you sure?')) {
      this.userService.delete(id).subscribe(
        (resp) => {
          this.getAllUser(id);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }*/
  }

  show(id: number) {
    this.router.navigate(['/show-rate', id]);
  }

  rate(id: number) {
    this.router.navigate(['/rate', id]);
  }


  public getAllUser(role: string) {
    this.selectedRole = role;
    this.showTable = false;

    this.userService.getUsersByRoles(role).subscribe(
      (resp: any) => {
        console.log('API Response:', resp);

        if (resp && Array.isArray(resp)) {
          this.productDetails = resp;
          this.showTable = true;
        } else {
          console.error('Invalid response structure. Expected an array.');
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
