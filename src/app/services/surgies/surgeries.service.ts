import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurgeriesService {

  private apiUrl = environment.apiUrl;
  public currentDisease: string = '';

  constructor(private httpClient: HttpClient) { }

  getAllSurgeriesBySpecialization(id: string) {
    return this.httpClient.get<any>(`${this.apiUrl + '/specializations/' + id + '/surgeries'}`);
  }

  getSurgeryById(surgeryId: string) {
    return this.httpClient.get<any>(`${this.apiUrl + '/surgeries/' + surgeryId}`);
  }

  setCurrentDisease(disease: string) {
    this.currentDisease = disease;
  }

  getAllSurgeries(limit: number = 20, offset: number = 0, skip: number = 0) {
    let filters = {
      "offset": offset,
      "limit": limit,
      "skip": skip,
      "order": ["name ASC"],
      "fields": {
        "id": true,
        "name": true,
        "specializationId": true,
        slug: true
      }
    };
    return this.httpClient.get<any>(`${this.apiUrl + '/surgeries/find-all?filter=' + (JSON.stringify(filters))}`);
  }

  getSurgeryBySlug(slug: string) {
    let params = new HttpParams().append('slug', slug);
    return this.httpClient.get<any>(`${this.apiUrl + '/surgeries/find-by-slug'}`, { params });
  }



}
