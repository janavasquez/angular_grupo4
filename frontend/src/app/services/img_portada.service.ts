import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(@Inject(DOCUMENT) private document: Document) {}

  getImages(): string[] {
    return [
      this.document.location.origin + '/assets/img_company/pelu 3.jpg',
      this.document.location.origin + '/assets/img_company/pelu 2.jpg',
      this.document.location.origin + '/assets/img_company/pelu 9.jpg'
    ];
  }
}