import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-demande-image-dialog',
  templateUrl: './show-demande-image-dialog.component.html',
  styleUrls: ['./show-demande-image-dialog.component.css']
})
export class ShowDemandeImageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.receiveImages();
  }

  receiveImages(){
    console.log(this.data);
  }
}
