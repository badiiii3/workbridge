import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { EventBusService } from 'src/app/_shared/event-bus.service';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showEntrepriseBoard = false;
  showClientBoard = false;
  showFreelancerBoard = false;
  username?: string;
  eventBusSub?: Subscription;

  constructor(private storageService: StorageService, private authService: AuthService,
    private router: Router, 
    private tokenStorageService: TokenStorageService,
     private eventBusService: EventBusService,
   ) { }
   

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.user_details.role;
      this.showEntrepriseBoard = this.roles.includes('ENTREPRISE');
      this.showClientBoard = this.roles.includes('CLIENT');
      this.showFreelancerBoard = this.roles.includes('FREELANCER');
      this.username = user.user_details.nom;
      
      this.eventBusSub = this.eventBusService.on('logout', () => {
        this.logout();
      });
      
    }

    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        
      });
  }








  ngOnDestroy(): void {
    if (this.eventBusSub)
      this.eventBusSub.unsubscribe();
  }

  logout(): void {
    this.tokenStorageService.signOut();

    this.isLoggedIn = false;
    this.roles = [];
    this.showEntrepriseBoard = false;
    this.showClientBoard = false;
    this.showFreelancerBoard = false;
    this.router.navigate(['/home']);
  }

}
