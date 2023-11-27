import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  // model: User = { nom: '', prenom: '', email: '', telephone: null, motDePasse: '', role: ''};

  hidePassword: boolean = true; // Flag to toggle password visibility

  constructor(private authService: AuthService, private router: Router) {} 


  // Register Form Group
  registerForm = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    phoneNumber: new FormControl('',[Validators.required,Validators.pattern(/^\d{8}$/)]),
    password: new FormControl('',[Validators.required]),
    role: new FormControl('',[Validators.required]),
  });

  getFirstName(){
    return this.registerForm.get('firstName')?.value ?? "";
  }
  getlastName(){
    return this.registerForm.get('lastName')?.value ?? "";
  }
  getEmail(){
    return this.registerForm.get('email')?.value ?? "";
  }
  getPhoneNumber(){
    return this.registerForm.get('phoneNumber')?.value ?? "";
  }
  getPassword(){
    return this.registerForm.get('password')?.value ?? "";
  }
  getRole(){
    return this.registerForm.get('role')?.value ?? "";
  }


  register() {

    const registerModel : User ={
      nom: this.getFirstName(),
      prenom: this.getlastName(),
      email: this.getEmail(),
      telephone: this.getPhoneNumber(),
      motDePasse: this.getPassword(),
      role: this.getRole(),
    }    
    this.authService.register(registerModel).subscribe(res=>{
      console.log(res); 
      this.registerForm.reset();
      this.router.navigate(['/login']);
    },err=>{
      console.log(err);
      
    })


  // const formData = new FormData();
  //   formData.append('request', JSON.stringify(this.model));
  
    
  //   formData.append('imageFile',JSON.stringify([]));
      
    
  
    
  //   formData.forEach((value, key) => {
  //     console.log(`${key}: ${value}`);
  //   });


    
    
  //   console.log(formData.forEach(data=>{console.log(data);
  //   }));
    
  
  //   this.authService.register(formData).subscribe(
  //     (response) => {
  //       console.log('Registration successful', response);
  //       this.router.navigate(['/login']);
  //     },
  //     (error) => {
  //       console.error('Registration error', error);
  //     }
  //   );
  }
  


 

  togglePasswordVisibility() {
    // Toggle the flag to show/hide the password
    this.hidePassword = !this.hidePassword;
  }


}
