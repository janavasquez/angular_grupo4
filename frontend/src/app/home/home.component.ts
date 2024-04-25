import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from '../services/img_portada.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  images: string[] | undefined;

  constructor(private imageService: ImageService) {}
  
  ngOnInit(): void {
    this.images = this.imageService.getImages();
  }

  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
}
