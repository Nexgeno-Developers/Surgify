import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { environment } from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let tok = localStorage.getItem('token');
        if (tok) {
            let token = JSON.parse(tok);
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token.token}`
                }
            });
        }
        return next.handle(request);
    }
}
