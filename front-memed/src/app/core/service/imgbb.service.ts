import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImgbbService {

  apiKey = "50a47bf2128effb2b260b348afce1d42";
  URL = "https://api.imgbb.com/1/upload";


  constructor(private http: HttpClient) { }

  /**
   * Upload image to imgbb database
   * @param formData 
   */
  uploadImage(formData: FormData){
    return this.http.post(`${this.URL}?key=${this.apiKey}`, formData);
  }


}
