import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL = 'https://api.github.com/users';

  constructor(private http: HttpClient) { }

  /**
   * Get all users
   */
  getUsers() {
    return this.http.get(`${this.URL}?per_page=10`);
  }

  /**
   * Get a single user by username
   */
  getUser(username: string) {
    return this.http.get(`${this.URL}/${username}`);
  }
}
