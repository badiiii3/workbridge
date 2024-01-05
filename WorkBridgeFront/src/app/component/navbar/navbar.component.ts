import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { tr } from 'date-fns/locale';
import { Subscription, filter } from 'rxjs';
import { EventBusService } from 'src/app/_shared/event-bus.service';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private role?: string;
  isLoggedIn = false;
  showEntrepriseBoard = false;
  showClientBoard = false;
  showFreelancerBoard = false;
  username?: string;
  eventBusSub?: Subscription;
user!:User;
id:any
  isHomePage: boolean | undefined;
  
  constructor(private storageService: StorageService, private authService: AuthService,
    private router: Router, 
    private tokenStorageService: TokenStorageService,
     private eventBusService: EventBusService, private userService : UserService,
   ) { }
   

  ngOnInit(): void {
    this.id = localStorage.getItem("userId")!;

    this.userService.getUserDetailsById(this.id).subscribe(user => this.user = user);
    this.isLoggedIn = !!localStorage.getItem("access_token");

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.role = localStorage.getItem("user_role") ?? "";
      console.log(this.role);
      
      switch (this.role){
        case "ENTREPRISE": {
          this.showEntrepriseBoard = true;
          break;
        }
        case "CLIENT": {
          this.showClientBoard = true;
          break;
        }
        case "FREELANCER": {
          this.showFreelancerBoard = true;
          break;
        }
      }

      this.username = localStorage.getItem("nom") ?? "";
      
      this.eventBusSub = this.eventBusService.on('logout', () => {
        this.logout();
      });
      
    }

    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        
      });

      this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isHomePage = this.router.url === '/home'; // Assurez-vous que '/home' correspond à l'URL de votre page d'accueil
      });
  }



  profile(id: any) {
    // Navigate to the route designed for updating a project, pass projectId as a parameter
    this.router.navigate(['/profile',id]);
  }




  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

  logout(): void {
    this.tokenStorageService.signOut();

    this.isLoggedIn = false;
    this.role = undefined;
    this.showEntrepriseBoard = false;
    this.showClientBoard = false;
    this.showFreelancerBoard = false;
    this.router.navigate(['/home']);
  }

}
