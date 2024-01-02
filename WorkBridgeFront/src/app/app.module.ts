import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './component/contact/contact.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FeatureComponent } from './component/feature/feature.component';
import { AboutComponent } from './component/about/about.component';
import { FactsComponent } from './component/facts/facts.component';
import { NewsletterComponent } from './component/newsletter/newsletter.component';
import { ProjectsComponent } from './component/projects/projects.component';
import { TestimonialComponent } from './component/testimonial/testimonial.component';
import { TeamComponent } from './component/team/team.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './component/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './component/home/home.component';
import { ProfileComponent } from './component/profile/profile.component';

import { RouterModule } from '@angular/router';

import {MatDialogModule} from '@angular/material/dialog';

import { AddNewProjectComponent } from './component/project/add-new-project/add-new-project.component';
import { ViewProjectByUserComponent } from './component/project/view-project-by-user/view-project-by-user.component';
import { UpdateProjectComponent } from './component/project/update-project/update-project.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authInterceptorProviders } from './_helpers/AuthInterceptor';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { AddServiceComponent } from './component/services/add-service/add-service.component';
import { EditServiceComponent } from './component/services/edit-service/edit-service.component';
import { ListServiceComponent } from './component/services/list-service/list-service.component';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { AddDemandeComponent } from './component/demande/add-demande/add-demande.component';
import { ListDemandeClientComponent } from './component/demande/list-demande-client/list-demande-client.component';
import { ListDemandeFreelanceComponent } from './component/demande/list-demande-freelance/list-demande-freelance.component';
import { ShowDemandeImageDialogComponent } from './component/demande/show-demande-image-dialog/show-demande-image-dialog.component';
import { AddRateComponent } from './component/add-rate/add-rate.component';
import { MatTableModule } from '@angular/material/table';
import { ListUserComponent } from './component/list-user/list-user.component';
import { ShowRateComponent } from './show-rate/show-rate.component';
import { ShowProjectComponent } from './show-project/show-project.component';
import { ShowServiceComponent } from './show-service/show-service.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { ShowImagesDialogComponent } from './show-images-dialog/show-images-dialog.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { UpdateUserComponent } from './update-user/update-user.component';



@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    NavbarComponent,
    FeatureComponent,
    AboutComponent,
    FactsComponent,
    NewsletterComponent,
    ProjectsComponent,
    TestimonialComponent,
    TeamComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,

    AddNewProjectComponent,
    ViewProjectByUserComponent,
    UpdateProjectComponent,
    ListUserComponent,
    HomeComponent,
    ProfileComponent,
    AddServiceComponent,
    EditServiceComponent,
    ListServiceComponent,
    ViewProjectByUserComponent,
    TestComponent,
    AddDemandeComponent,
    ListDemandeFreelanceComponent,
    ListDemandeClientComponent,
    ShowDemandeImageDialogComponent,
    AddRateComponent,
    ShowRateComponent,
    ShowProjectComponent,
    ShowServiceComponent,
    StarRatingComponent,
    ShowImagesDialogComponent,
    UpdateUserComponent,
    
  
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    MatGridListModule,
    MatTableModule,
    MatDialogModule,
    BrowserAnimationsModule,
   
  
   
  
   

 
  ],
  
  providers: [authInterceptorProviders,httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
