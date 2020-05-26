import { Component, OnInit } from '@angular/core';
import { MemeService } from 'src/app/core/service/meme.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  memes: any;

  constructor(
    private memeService: MemeService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.memes = this.memeService.getMemes();
  }

  copyLink() {
    this.snackBar.open("✔ Link coppied to your clipboard", '', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['snackbar-stlye']
    });
  }

}
