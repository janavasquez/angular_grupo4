import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user.model';


@Component({
  selector: 'app-avatar-form',
  standalone: true,
  imports: [],
  templateUrl: './avatar-form.component.html',
  styleUrl: './avatar-form.component.css'
})
export class AvatarFormComponent implements OnInit {
  photoFile: File | undefined;
  photoPreview: string | undefined;
  user: User | undefined;
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient.get<User>('http://localhost:3000/user/account')
    .subscribe(user => this.user = user);
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
    if (!this.photoFile) return;

    let formData = new FormData();
    formData.append('file', this.photoFile);

    this.httpClient.post<User>('http://localhost:3000/user/avatar', formData)
    .subscribe(user => {
      this.photoFile = undefined;
      this.photoPreview = undefined;
      this.user = user;
    });

  }
}
