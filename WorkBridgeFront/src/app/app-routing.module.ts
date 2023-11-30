import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { TeamComponent } from './component/team/team.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SignupComponent } from './component/signup/signup.component';
import { AddNewProjectComponent } from './component/project/add-new-project/add-new-project.component';
import { ProjectResolveService } from './service/project-resolve.service';
import { ViewProjectByUserComponent } from './component/project/view-project-by-user/view-project-by-user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'add-project', component: AddNewProjectComponent , 
          resolve: {
                 project: ProjectResolveService
               }},
 { path: 'showProjectByUser' , component: ViewProjectByUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
