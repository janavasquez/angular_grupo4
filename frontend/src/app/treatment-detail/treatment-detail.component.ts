import { NgIf } from '@angular/common';
import { Treatment } from './../interfaces/treatment.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-treatment-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './treatment-detail.component.html',
  styleUrl: './treatment-detail.component.css'
})
export class TreatmentDetailComponent {

    tratamiento: Treatment  | undefined;
  Treatment: { title: string; price: number; } | undefined;

    loadtratamiento() {
      console.log("Se ha hecho clic en loadProduct");

      this.Treatment = {
        title: "corte y peinado",
        price: 35
      };
      console.log(this.Treatment);
    }

}


