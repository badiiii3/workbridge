import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Project } from '../model/project.model';
import { FileHandel } from '../model/file-handel.model';
import { OfferResolveService } from './offer-resolve.service';
import { Offer } from '../model/offer.model';


@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer : DomSanitizer) { }

  public createImages(project: any){
    const projectImages: any[] = project.projectImages;

    const projectImagesToFileHandle: FileHandel[] = [];

    for(let i=0; i<projectImages.length; i++){
      const imageFileData = projectImages[i];
      const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);
      const imageFile = new File([imageBlob], imageFileData.name, { type: imageFileData.type});

      const finalFileHandel : FileHandel = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      projectImagesToFileHandle.push(finalFileHandel);
    }
    project.projectImages = projectImagesToFileHandle;
    return project;
  }
  public createImage2(offer: Offer){
    const projectImages: any[] = offer.offerImages;

    const projectImagesToFileHandle: FileHandel[] = [];

    for(let i=0; i<projectImages.length; i++){
      const imageFileData = projectImages[i];
      const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);
      const imageFile = new File([imageBlob], imageFileData.name, { type: imageFileData.type});

      const finalFileHandel : FileHandel = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      projectImagesToFileHandle.push(finalFileHandel);
    }
    offer.offerImages = projectImagesToFileHandle;
    return offer;
  }
  

  public dataURItoBlob(picBytes: any, imageType: any) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i=0; i<byteString.length; i++){
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: imageType});
    return blob;

  }

}
