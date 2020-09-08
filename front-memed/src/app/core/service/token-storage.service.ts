import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public hasToken(): boolean {
    return !!window.sessionStorage.getItem(TOKEN_KEY);
  }

  public decodeToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }

  deleteToken() {
    window.sessionStorage.clear();
  }
}
