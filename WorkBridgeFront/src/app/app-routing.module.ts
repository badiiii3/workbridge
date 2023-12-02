import { NgModule } from '@angular/core';
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


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'add-project', component: AddNewProjectComponent , 
          resolve: {
                 project: ProjectResolveService
               }},
 { path: 'showProjectByUser' , component: ViewProjectByUserComponent },
 { path: 'update-project/:id', component: UpdateProjectComponent ,resolve: {
  project: ProjectResolveService
}},

  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
