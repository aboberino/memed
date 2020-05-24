import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css']
})
export class MemeComponent implements OnInit {

  name: string;
  email: string;
  message: string;

  constructor() { }

  ngOnInit() {
  }

  submitForm() {
    const alertMessage = `Name: ${this.name} \nEmail: ${this.email} \nMessage: ${this.message}`;
    alert(alertMessage);
  }

}
