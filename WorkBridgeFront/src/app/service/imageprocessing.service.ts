import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Offer } from 'src/app/model/offer';
import { FileHandel } from 'src/app/model/file-handel.model';


@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer : DomSanitizer) { }

  public createImages(offer: Offer){
    const offerImages: any[] = offer.offerImages;

    const offerImagesToFileHandle: FileHandel[] = [];

    for(let i=0; i<offerImages.length; i++){
      const imageFileData = offerImages[i];
      const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);
      const imageFile = new File([imageBlob], imageFileData.name, { type: imageFileData.type});

      const finalFileHandel : FileHandel = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      offerImagesToFileHandle.push(finalFileHandel);
    }
    offer.offerImages = offerImagesToFileHandle;
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