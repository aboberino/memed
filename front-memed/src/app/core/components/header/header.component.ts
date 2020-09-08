import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('navBurger') navBurger: ElementRef;
  @ViewChild('navMenu') navMenu: ElementRef;
  isLoggedIn: boolean;
  currentUser: any;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      console.log("isLoggedIn : " + isLoggedIn);
      this.isLoggedIn = isLoggedIn;
    });
    this.currentUser = this.userService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
  }

  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }

}
