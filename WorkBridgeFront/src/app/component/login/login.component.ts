import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Auth } from 'src/app/model/auth';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private bleep: HTMLAudioElement = new Audio();
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private tokenStorage: TokenStorageService, private router: Router) {
      this.bleep.src = "../assets/Mouse-Click.mp3";
     }


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    motDePasse: new FormControl('', [Validators.required])

  });

  getEmail() {
    return this.loginForm.get('email')?.value ?? "";
  }

  getPassword() {
    return this.loginForm.get('motDePasse')?.value ?? "";
  }

  form: any = {
    email: null,
    motDePasse: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  hidePassword = true;

  ngOnInit(){
    console.log("Audio source:", this.bleep.src);

  }





  login(): void {

    this.bleep.play();
    const loginModel: Auth = {
      email: this.getEmail(),
      motDePasse: this.getPassword(),
    }
    const { email, motDePasse } = this.form;
    

    this.authService.login(loginModel).subscribe({
      next: data => {
         console.log('Login successful');
         //console.log(data);

        this.storeCreds(data);

        // UI interactions
        this.isLoginFailed = false;
        this.isLoggedIn = true;

        // Navigate after login
        this.router.navigate(['/home']);
      },
      error: err => {
        console.log('Login error', err);
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
  

  reloadPage(): void {
    window.location.reload();

  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }



  // Store creds
  storeCreds(data: any){
    localStorage.setItem("access_token",data.access_token);
    localStorage.setItem("refresh_token",data.refresh_token);
    localStorage.setItem("userId",data.user_details.id);
    localStorage.setItem("user_role",data.user_details.role);
    localStorage.setItem("nom",data.user_details.nom)
    localStorage.setItem("profilePic",data.user_details.userImages[0].picByte);
  }
}
