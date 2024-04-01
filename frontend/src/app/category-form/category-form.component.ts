import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Category } from '../interfaces/category.model';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule, RouterLink],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit {

categoryForm = new FormGroup({
  id: new FormControl(),
  name: new FormControl(),
  photoUrl: new FormControl(),
  minAge: new FormControl(),
  treatment: new FormControl(''),
  description: new FormControl('')

});

photoFile: File | undefined;
photoPreview: string | undefined;
isUpdate: boolean = false;
category: Category | undefined;


constructor(
  private httpClient: HttpClient,
  private activatedRoute: ActivatedRoute,
) {}

ngOnInit(): void{

  // recuperar las categorias del Backend de forma dinamica

  this.activatedRoute.params.subscribe(params => {
    const id = params['id'];
    if(!id) {
      return;
    }


    this.httpClient.get<Category>(`http://localhost:3000/category/${id}`).subscribe(category => {
      this.isUpdate = true;
      this.category= category;

      this.categoryForm.reset({
        id: category.id,
        name: category.name,
        minAge: category.minAge,
        photoUrl: category.photoUrl,
        description: category.description
      })

      });

    });

}

onFileChange(event: Event) {

    let target = event.target as HTMLInputElement;

    if (target.files !== null && target.files.length > 0) {
      this.photoFile = target.files[0]; // extraer el primer archivo

      // Opcional: Mostrar la imagen por pantalla para previsualizarla antes de subirla
      let reader = new FileReader();
      reader.onload = event => this.photoPreview = reader.result as string;
      reader.readAsDataURL(this.photoFile);
    }

  }

  save() {

    let formData = new FormData();
    formData.append('id', this.categoryForm.get('id')?.value ?? 0);
    formData.append('name', this.categoryForm.get('name')?.value ?? '');
    formData.append('photoUrl', this.categoryForm.get('photoUrl')?.value ?? '');
    formData.append('treatment', this.categoryForm.get('nametreatment')?.value ?? '');
    formData.append('description', this.categoryForm.get('description')?.value ?? '');
    formData.append('minAge', this.categoryForm.get('id')?.value ?? 0);


    if(this.photoFile) formData.append('file', this.photoFile);

    if(this.isUpdate) {
      const id =  this.categoryForm.get('id')?.value;
      this.httpClient.put<Category>('http://localhost:3000/category/' + id, formData)
        .subscribe(category => {
          this.photoFile = undefined;
          this.photoPreview = undefined;
          this.category = category;
        });

    } else {
      this.httpClient.post<Category>('http://localhost:3000/category', formData)
        .subscribe(category => {
          this.photoFile = undefined;
          this.photoPreview = undefined;
          this.category = category;
        });

  }


}
}
