import { Component, OnInit } from '@angular/core';
import { MemeService } from 'src/app/core/service/meme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  memes: any;

  constructor(private memeService: MemeService) { }

  ngOnInit() {
    this.memes = this.memeService.getMemes();
  }

}
