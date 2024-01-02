import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { TeamComponent } from './component/team/team.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SignupComponent } from './component/signup/signup.component';
import { AddNewProjectComponent } from './component/project/add-new-project/add-new-project.component';
import { ProjectResolveService } from './service/project-resolve.service';
import { ViewProjectByUserComponent } from './component/project/view-project-by-user/view-project-by-user.component';
import { UpdateProjectComponent } from './component/project/update-project/update-project.component';
import { HomeComponent } from './component/home/home.component';
import { ProfileComponent } from './component/profile/profile.component';
import { AddServiceComponent } from './component/services/add-service/add-service.component';
import { ListServiceComponent } from './component/services/list-service/list-service.component';
import { ServiceResolveService } from './service/service-resolve.service';
import { EditServiceComponent } from './component/services/edit-service/edit-service.component';
import { ViewProjectFreelanceComponent } from './view-project-freelance/view-project-freelance.component';

import { BrowserModule } from '@angular/platform-browser';
import { TestComponent } from './test/test.component';
import { AddDemandeComponent } from './component/demande/add-demande/add-demande.component';
import { ListDemandeFreelanceComponent } from './component/demande/list-demande-freelance/list-demande-freelance.component';
import { ListDemandeClientComponent } from './component/demande/list-demande-client/list-demande-client.component';
import { AddRateComponent } from './component/add-rate/add-rate.component';
import { ListUserComponent } from './component/list-user/list-user.component';
import { ShowRateComponent } from './show-rate/show-rate.component';
import { ShowProjectComponent } from './show-project/show-project.component';
import { ShowServiceComponent } from './show-service/show-service.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'add-project', component: AddNewProjectComponent, resolve: { project: ProjectResolveService } },
  { path: 'showProjectByUser', component: ViewProjectByUserComponent },
  { path: 'Projects', component: TestComponent },
  { path: 'showProjectFreelance', component: ViewProjectFreelanceComponent },
  { path: 'apply/:id', component: AddDemandeComponent},

  { path: 'update-project/:id', component: UpdateProjectComponent, resolve: { project: ProjectResolveService } },
  { path: 'add-service', component: AddServiceComponent },
  { path: 'showServiceByUser', component: ListServiceComponent },
  { path: 'ShowDemandeByProject/:id', component: ListDemandeClientComponent },


  { path: 'showDemandeByUser', component: ListDemandeFreelanceComponent },

  { path: 'edit-service/:id', component: EditServiceComponent, resolve: { service: ServiceResolveService }},
  { path: 'home', component: HomeComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'rate/:id', component: AddRateComponent},
  { path: 'user', component: ListUserComponent},
  { path: 'show-rate/:id', component: ShowRateComponent},
  { path: 'user-project/:id', component: ShowProjectComponent },
  { path: 'user-service/:id', component: ShowServiceComponent },


];


@NgModule({
  imports: [CommonModule, BrowserModule ,RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
