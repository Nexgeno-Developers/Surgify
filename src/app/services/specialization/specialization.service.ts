import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllSpecializations() {
    let filters = {
      "offset": 0,
      "limit": 100,
      "skip": 0
    };
    return this.httpClient.get<any>(`${this.apiUrl + '/specializations?filter=' + (JSON.stringify(filters))}`);
  }
}
