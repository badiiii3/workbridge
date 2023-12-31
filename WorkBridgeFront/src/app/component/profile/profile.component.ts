import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandel } from 'src/app/model/file-handel.model';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isNewUser: boolean = true;
  
  userId: any;
  username: string = localStorage.getItem("nom")!;
user:User={
  id:null,
        nom: "",
         prenom: "",
       email: "",
            telephone: "",
            motDePasse:"",
      role:"",
       images: [],
   
}
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId")!;
    console.log('User ID:', this.userId);


    if (this.userId) {
      this.userService.getUserDetailsById(this.userId).subscribe(
        (data: User) => {
          this.user = data; // Assurez-vous que le modèle est correctement initialisé ici
          console.log('user:', data);
        },
        (error: HttpErrorResponse) => console.error(error)
      );
    } else {
    }  }

  Update(projectForm: NgForm) {
    const formData = this.prepareFormData(this.user);

    this.userService.updateProfile(this.userId, formData).subscribe(
      () => {
        projectForm.reset();
        this.user.images = [];
        this.goToProjectList();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  prepareFormData(user: User): FormData {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));

    if (user.images && user.images.length > 0) {
      for (let i = 0; i < user.images.length; i++) {
        formData.append('imageFile', user.images[i].file, user.images[i].file.name);
      }
    }

    return formData;
  }

  goToProjectList() {
    this.router.navigate(['/showProjectByUser']);
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (!this.user) {
      }

      if (!this.user.images) {
        this.user.images = [];
      }

      const fileHandle: FileHandel = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      };

      this.user.images.push(fileHandle);
    }
  }

  removeImages(i: number) {
   // this.user.images.splice(i, 1);
  }

  fileDropped(fileHandle: any) {
   // this.user.images.push(fileHandle);
  }
}
