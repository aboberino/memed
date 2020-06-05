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
    // this.memes = this.memeService.getMemes();
    this.memes = [
      {"name":"reupjesus", "link":"https://image.noelshack.com/fichiers/2018/26/7/1530476579-reupjesus.png", "tags":"Oui"},
      {"name":"alkperplexe", "link":"https://image.noelshack.com/fichiers/2020/21/4/1590077559-alkperplexe.png", "tags":"Oui"},
    ];
  }

}
