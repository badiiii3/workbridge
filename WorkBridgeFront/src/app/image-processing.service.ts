import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileHandel } from './model/file-handel.model';
import { Servic } from './model/servic';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImages(servic: Servic){
    const serviceImages: any[] = servic.serviceImages;

    const serviceImagesToFileHandle: FileHandel[] = [];

    for(let i=0; i<serviceImages.length; i++){
      const imageFileData = serviceImages[i];
      const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);
      const imageFile = new File([imageBlob], imageFileData.name, { type: imageFileData.type});

      const finalFileHandel : FileHandel = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      serviceImagesToFileHandle.push(finalFileHandel);
    }
    servic.serviceImages = serviceImagesToFileHandle;
    return servic;
  }

  public dataURItoBlob(picBytes: string, imageType: any): Blob {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([int8Array], { type: imageType });
  }
}
