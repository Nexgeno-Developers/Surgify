import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiUrl = environment.apiUrl;
    public currentUser: any;
    public currentLocation: any;

    constructor(private httpClient: HttpClient) { }

    initiatePasswordReset(id: string) {
        return this.httpClient.get<any>(`${this.apiUrl + '/users/reset-password/init'}`);
    }

    signUp(signUpData: any) {
        return this.httpClient.post<any>(`${this.apiUrl + '/signup'}`, signUpData);
    }

    sendVerificationCode(email: string) {
        return this.httpClient.post(`${this.apiUrl + '/users/verify-account/init'}`, { email });
    }

    verifyCode(code: string) {
        let data = {
            "resetKey": code,
            "password": "string2342342",
            "confirmPassword": "string2342342"
        };
        return this.httpClient.put(`${this.apiUrl + '/users/verify-account/finish'}`, data);
    }

    signIn(email: string, password: string) {
        return this.httpClient.post(`${this.apiUrl + '/login'}`, { email, password });
    }

    getCurrentUser() {
        let tok = localStorage.getItem('token');
        if (tok) {
            let token = JSON.parse(tok);
            let user = jwt_decode(token.token);
            return user;
        }
        return null;
    }

    getMyProfile() {
        return this.httpClient.get(`${this.apiUrl + '/users/me'}`);
    }

    sendPassword(email: string) {
        return this.httpClient.get(`${this.apiUrl + '/users/forgot-password/' + email}`);
    }

    setCurrentCity(city: any) {
        this.currentLocation = city;
    }


    updateMyProfile(profile: any) {
        return this.httpClient.patch<any>(`${this.apiUrl + '/users/update-me'}`, profile);
    }

    changePassword(data: any) {
        return this.httpClient.post<any>(`${this.apiUrl + '/users/change-mypassword'}`, data);
    }


}
