import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { JwtResponse } from '../model/jwt-response';
import { AuthLoginInfo } from '../model/login-info';
import { TokenStorageService } from '../../core/service/token-storage.service';
import { UserService } from 'src/app/core/service/user.service';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:4242/api/auth';
  private loggedIn: BehaviorSubject<boolean>;


  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private userService: UserService, private router: Router) {
    this.loggedIn = new BehaviorSubject<boolean>(this.tokenStorage.hasToken());
    console.log("AuthService.loggedIn :" + this.loggedIn);
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(credentials: AuthLoginInfo) {
    return this.http.post<JwtResponse>(`${this.URL}/login`, credentials, httpOptions)
      .pipe(map((response: JwtResponse) => {
        if (response && response.accessToken) {
          this.tokenStorage.saveToken(response.accessToken);
          this.loggedIn.next(true);
          this.router.navigate(['/']);
        }
      }));
  }

  register(user) {
    return this.http.post<any>(`${this.URL}/register`, user, httpOptions)
      .pipe(map((response: JwtResponse) => {
        if (response && response.accessToken) {
          this.tokenStorage.saveToken(response.accessToken);
          this.loggedIn.next(true);
          this.router.navigate(['/']);
        }
      }));
  }

  logout() {
    this.tokenStorage.deleteToken();
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
