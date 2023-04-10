import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DoctorService {

    private apiUrl = environment.apiUrl;
    public currentDoctor: any;

    constructor(private httpClient: HttpClient) { }

    getAllDoctors() {
        let filters = {
            "offset": 0,
            "limit": 100,
            "skip": 0
        };
        return this.httpClient.get<any>(`${this.apiUrl + '/doctors?filter=' + (JSON.stringify(filters))}`);
    }

    findDoctorsBySurgeryNLocation(searchText: string, location: string) {
        let searchExp = new RegExp(searchText, "i");
        let filters: any = {
            "offset": 0,
            "limit": 100,
            "skip": 0,
            where: {
                and: [
                    { locations: { inq: ['Hyderabad'] } },
                    { disease: { like: searchExp } }
                ]
            }
        };
        filters = {
            "offset": 0,
            "limit": 100,
            "skip": 0,
            where: { disease: { like: searchExp } }
        };

        let params = new HttpParams().append('search', searchText).append('filter', JSON.stringify(filters));
        if (location.toLowerCase() != 'all') {
            params = params.append('location', location);
        }
        return this.httpClient.get<any>(`${this.apiUrl + '//docs/find-doctors'}`, { params });
    }


    getDoctorById(id: string) {
        return this.httpClient.get<any>(`${this.apiUrl + '/doctors/' + id}`);
    }

    setCurrrentDoc(doctor: any) {
        this.currentDoctor = doctor;
    }
}
