import { Component, OnInit } from '@angular/core';
import { MemeService } from 'src/app/core/service/meme.service';
import { Meme } from 'src/app/model/meme';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
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

  apiKeyImgbb: "50a47bf2128effb2b260b348afce1d42";

  constructor(private memeService: MemeService) { }

  ngOnInit() {}

  submitForm() {
    if (this.selectedFile == null){
      alert("You need to select a file.");
    }
    else{
      const alertMessage = `Name: ${this.name} \nTags: ${this.tags}`;
      alert(alertMessage);
      this.newMeme.image = this.convertedFile;
      this.memeService.createMeme(this.newMeme).subscribe(res => {
        console.log(res);
        alert("New meme created with success");
      });
    }
    
  }

  onFileChanged(imageInput: any){
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFileName = this.selectedFile.file.name;
      this.convertedFile = event.target.result.replace('data:' + this.selectedFile.file.type + ';base64,','');
    });
    reader.readAsDataURL(file);
  }

}
