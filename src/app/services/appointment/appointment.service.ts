import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {

    private apiUrl = environment.apiUrl;

    constructor(private httpClient: HttpClient) { }

    getAllSpecializations(booking: any) {
        booking = {
            "offset": 0,
            "limit": 100,
            "skip": 0
        };
        return this.httpClient.get<any>(`${this.apiUrl + '/bookings'}`, booking);
    }

    bookAppointment(booking: any) {
        return this.httpClient.post<any>(`${this.apiUrl + '/bookings'}`, booking);
    }

    
  getCountOfBookings() {
    return this.httpClient.get<any>(`${this.apiUrl+'/bookings/count'}`);
  }

  getAllBookingsByPage(limit: number=20, offset: number = 0, skip: number = 0) {
    let filters = {
      "offset": offset,
      "limit": limit,
      "skip": skip,
      "order": ["created DESC"]
    };
    return this.httpClient.get<any>(`${this.apiUrl + '/bookings?filter=' + (JSON.stringify(filters))}`);
  }
}
