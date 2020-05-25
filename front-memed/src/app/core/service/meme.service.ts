import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemeService {

  URL = 'http://localhost:4242/api/meme';

  constructor(private http: HttpClient) { }

  /**
   * Get all memes
   */
  getMemes(): Observable<any> {
    return this.http.get(`${this.URL}`);
  }

  /**
   * Get a single meme by name
   */
  getMeme(name: string): Observable<any> {
    return this.http.get(`${this.URL}/${name}`);
  }

  /**
   * Create a meme by passing a meme object in parameter
   */
  createMeme(meme: any): Observable<any> {
    return this.http.post(`${this.URL}`, meme);
  }
}
