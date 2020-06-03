import { Component, OnInit } from '@angular/core';
import { MemeService } from 'src/app/core/service/meme.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { PagerService } from 'src/app/core/service/pager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private memes: any;
  memesCopy: any;
  // array of all items to be paged
  // private allItems: any;
  // pager object
  // pager: any = {};
  // paged items
  // pagedItems: any[];

  constructor(
    private memeService: MemeService,
    private snackBar: MatSnackBar,
    // private pagerService: PagerService
  ) { }

  ngOnInit() {
    this.memesCopy = [];
    this.memeService.getMemes().subscribe(data => {
      this.memes = data;
      this.assignCopyList()
      // this.setPage(1);
    });
  }

  copyLink() {
    this.snackBar.open("✔ Link coppied to your clipboard", '', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['snackbar-success']
    });
  }

  assignCopyList(){
    this.memesCopy = Object.assign([], this.memes);
  }

  getMemes(event) {
    const val = event.target.value;
    this.assignCopyList();

    if (val && val.trim() != ''){
      this.memesCopy = this.memesCopy.filter(meme => {
        let memeName = meme.name;
        return (memeName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  // setPage(page: number) {
  //   // get pager object from service
  //   this.pager = this.pagerService.getPager(this.memes.length, page);    
  //   // get current page of items
  //   this.memesCopy = this.memesCopy.slice(this.pager.startIndex, this.pager.endIndex + 1);
  // }
}
