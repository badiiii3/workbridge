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
import { AddServiceComponent } from './component/services/add-service/add-service.component';
import { ListServiceComponent } from './component/services/list-service/list-service.component';
import { EditServiceComponent } from './component/edit-service/edit-service.component';

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
    AddServiceComponent,
    ListServiceComponent,
    EditServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }