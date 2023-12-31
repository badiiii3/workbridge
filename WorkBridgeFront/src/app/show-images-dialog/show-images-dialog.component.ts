import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-images-dialog',
  templateUrl: './show-images-dialog.component.html',
  styleUrls: ['./show-images-dialog.component.css']
})
export class ShowImagesDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.receiveImages();
  }

  receiveImages(){
    console.log(this.data);
  }
}
