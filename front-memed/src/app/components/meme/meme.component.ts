import { Component, OnInit } from '@angular/core';
import { MemeService } from 'src/app/core/service/meme.service';
import { Meme } from 'src/app/model/meme';
import { ImgbbService } from 'src/app/core/service/imgbb.service';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var require: any;

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css']
})
export class MemeComponent implements OnInit {

  newMeme: Meme;
  selectedFile: any;
  selectedFileName: String = "Upload file…";
  convertedFile: String;
  returnedObject: any;
  todayDate: Date;

  constructor(
    private memeService: MemeService,
    private imgbbService: ImgbbService,
    private snackBar: MatSnackBar
  ) {
    this.newMeme = {
      id: null,
      name: null,
      image: null,
      link: null,
      tags: null,
      date: null
    }
  }

  ngOnInit() { }

  submitForm() {
    if (this.selectedFile == null) {
      this.snackBar.open("❌ You need to select a file.", '(╯°□°)╯︵ ┻━┻', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
        panelClass: ['snackbar-fail']
      });
    }
    else {
      this.newMeme.image = this.convertedFile;
      
      let dateFormat = require('dateformat');
      this.todayDate = dateFormat(new Date(), "yyyy-mm-dd");
      this.newMeme.date = this.todayDate;
      
      const formData = new FormData();
      formData.append('image', this.newMeme.image);

      // Appel vers l'api de imgbb pour uploader l'image selectionnée
      this.imgbbService.uploadImage(formData).subscribe(
        (res) => {
          console.log(res);
          this.returnedObject = res;
          this.returnedObject.data.url;
          this.newMeme.link = this.returnedObject.data.url;

          // Appel vers l'api pour créer le meme
          this.memeService.createMeme(this.newMeme).subscribe(res => {
            this.snackBar.open("✔ Meme created", '', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
              panelClass: ['snackbar-success']
            });
            this.resetPage();
          });
        },
        (err) => console.log(err)
      );
    }

  }

  onFileChanged(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFileName = this.selectedFile.file.name;
      this.convertedFile = event.target.result.replace('data:' + this.selectedFile.file.type + ';base64,', '');
    });
    reader.readAsDataURL(file);
  }

  resetPage() {
    this.newMeme = {
      id: null,
      name: null,
      image: null,
      link: null,
      tags: null,
      date: null
    }
    this.selectedFile = null;
    this.selectedFileName = "Upload file…";
    this.convertedFile = null;
    this.returnedObject = null;
  }
}
