import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { TeamComponent } from './component/team/team.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SignupComponent } from './component/signup/signup.component';
import { AddNewOfferComponent } from './component/offer/add-new-offer/add-new-offer.component';
import { OfferResolveService } from './service/offer-resolve.service';
import { ListOffersComponent } from './component/offer/list-offers/list-offers.component';
import { UpdateofferComponent } from './component/offer/update-offer/update-offer.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'add-offer', component: AddNewOfferComponent , 
          resolve: {
                 offer: OfferResolveService
               }},
 { path: 'list-offers' , component: ListOffersComponent },
 { path: 'update-offer/:id', component: UpdateofferComponent ,resolve: {
  offer: OfferResolveService
}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }