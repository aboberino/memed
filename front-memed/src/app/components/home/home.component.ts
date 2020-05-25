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
    // this.memes = [
    //   {"name":"reupjesus", "link":"https://image.noelshack.com/fichiers/2018/26/7/1530476579-reupjesus.png", "tags":"Oui"},
    //   {"name":"alkperplexe", "link":"https://image.noelshack.com/fichiers/2020/21/4/1590077559-alkperplexe.png", "tags":"Oui"},
    //   {"name":"risibo", "link":"https://image.noelshack.com/fichiers/2017/13/1490886827-risibo.png", "tags":"Oui"},
    //   {"name":"vallsquisue", "link":"https://image.noelshack.com/fichiers/2016/51/1482269231-vallsquisuereupload.gif", "tags":"Oui"},
    //   {"name":"altieri", "link":"https://image.noelshack.com/fichiers/2020/15/7/1586668024-jesus-rire-hd-altieri.png", "tags":"Oui"},
    //   {"name":"Les affaires sont les affaires", "link":"https://image.noelshack.com/fichiers/2017/18/1494048058-pppppppppppppppppppp.png", "tags":"Oui"},
    //   {"name":"jesusreup", "link":"https://image.noelshack.com/fichiers/2018/27/4/1530827992-jesusreup.png", "tags":"Oui"},
    //   {"name":"risitasboxe", "link":"https://image.noelshack.com/fichiers/2016/47/1480196381-risitasboxe.gif", "tags":"Oui"},
    //   {"name":"1589788059", "link":"https://image.noelshack.com/fichiers/2020/21/1/1589788059-img-6546.png", "tags":"Oui"},
    //   {"name":"bigard", "link":"https://image.noelshack.com/fichiers/2020/22/1/1590423535-bigard.png", "tags":"Oui"},
    //   {"name":"risitaspeur", "link":"https://image.noelshack.com/fichiers/2017/39/3/1506463227-risitaspeur.png", "tags":"Oui"},
    //   {"name":"risitas33", "link":"https://image.noelshack.com/fichiers/2018/29/6/1532128784-risitas33.png", "tags":"Oui"}
    // ];
  }

}
