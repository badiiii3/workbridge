import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router){}

  
  model = { email: '', motDePasse: '' };
  hidePassword = true;



 

  onSubmit() {
    // You can handle form submission logic here
    console.log('Form submitted', this.model);
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
