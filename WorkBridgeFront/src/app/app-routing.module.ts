import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { TeamComponent } from './component/team/team.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SignupComponent } from './component/signup/signup.component';
import { AddServiceComponent } from './component/services/add-service/add-service.component';
import { ListServiceComponent } from './component/services/list-service/list-service.component';
import { ServiceResolveService } from './service-resolve.service';
import { EditServiceComponent } from './component/services/edit-service/edit-service.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'add-service', component: AddServiceComponent,resolve: {
    service: ServiceResolveService
  } },
  { path: 'edit-service/:id', component: EditServiceComponent,resolve: {
    service: ServiceResolveService
  } },
  { path: 'list-service', component: ListServiceComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
