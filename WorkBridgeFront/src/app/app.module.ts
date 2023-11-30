import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './component/contact/contact.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FeatureComponent } from './component/feature/feature.component';
import { AboutComponent } from './component/about/about.component';
import { FactsComponent } from './component/facts/facts.component';
import { ServiceComponent } from './component/service/service.component';
import { NewsletterComponent } from './component/newsletter/newsletter.component';
import { ProjectsComponent } from './component/projects/projects.component';
import { TestimonialComponent } from './component/testimonial/testimonial.component';
import { TeamComponent } from './component/team/team.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginComponent } from './component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './component/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';

import {MatDialogModule} from '@angular/material/dialog';

import { AddNewProjectComponent } from './component/project/add-new-project/add-new-project.component';
import { ViewProjectByUserComponent } from './component/project/view-project-by-user/view-project-by-user.component';
@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    NavbarComponent,
    FeatureComponent,
    AboutComponent,
    FactsComponent,
    ServiceComponent,
    NewsletterComponent,
    ProjectsComponent,
    TestimonialComponent,
    TeamComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    AddNewProjectComponent,
    ViewProjectByUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
   
  

    MatDialogModule,
   
  
   
  
   

 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
