import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../service/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private role: string;
  private authority: string;

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
    ) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.role = this.tokenStorage.getAuthorities();

      if (this.role === 'ROLE_ADMIN') {
        this.authority = 'admin';
        return false;
      } 
      else if (this.role === 'ROLE_CONFIRMED') {
        this.authority = 'pm';
        return false;
      }
      this.authority = 'user';
      return true;
    }

    console.log(this.role);
    console.log(this.authority);
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
