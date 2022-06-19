import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HospitalService {
    private apiUrl = environment.apiUrl;
    constructor(private httpClient: HttpClient) { }

    getAllHospitals(limit: number) {
        let filters = {
            "offset": 0,
            "limit": limit,
            "skip": 0
        };
        let params = new HttpParams().append('filter', JSON.stringify(filters));
        return this.httpClient.get<any>(`${this.apiUrl + '/network-hospitals'}`, { params });
    }

    searchHospitals(limit: number, searchText: string, location: string) {
        let filters = {
            "offset": 0,
            "limit": limit,
            "skip": 0
        };
        let params = new HttpParams().append('filter', JSON.stringify(filters));
        if (location) {
            params = params.append('location', location);
        }

        if (searchText) {
            params = params.append('search', searchText);
        }
        return this.httpClient.get<any>(`${this.apiUrl + '/network-hospitals/find'}`, { params });
    }
}