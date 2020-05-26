import { Component, OnInit } from '@angular/core';
import { MemeService } from 'src/app/core/service/meme.service';
import { Meme } from 'src/app/model/meme';
import { ImgbbService } from 'src/app/core/service/imgbb.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  name: String;
  tags: String;

  selectedFile: any;
  selectedFileName: String = "Upload file…";
  convertedFile: String;

  returnedObject: any;

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
      tags: null
    }
  }

  ngOnInit() { }

  submitForm() {
    if (this.selectedFile == null) {
      this.snackBar.open("You need to select a file.", '(╯°□°)╯︵ ┻━┻', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'end' });
    }
    else {
      this.newMeme.image = this.convertedFile;

      const formData = new FormData();
      formData.append('image', this.newMeme.image);



      this.imgbbService.uploadImage(formData).subscribe(
        (res) => {
          console.log(res);
          this.returnedObject = res;
          this.returnedObject.data.url;
          this.newMeme.link = this.returnedObject.data.url;

          this.memeService.createMeme(this.newMeme).subscribe(res => {
            this.snackBar.open("Meme created", '👌', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'end' });
            window.location.reload();
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

}
