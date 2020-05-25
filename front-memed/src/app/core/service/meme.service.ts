import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemeService {

  URL = 'http://localhost:4242/api/meme';

  constructor(private http: HttpClient) { }

  /**
   * Get all memes
   */
  getMemes() {
    return this.http.get(`${this.URL}`);    
  }

  /**
   * Get a single meme by name
   */
  getMeme(name: string) {
    return this.http.get(`${this.URL}/${name}`);
  }
}
