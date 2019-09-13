import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class AuthorizationService {

    user: any;
    constructor(private http: HttpClient, private router: Router) {}

    isLoggedin(): boolean {
        if (this.user && localStorage.getItem('currentUser')) {
            return true;
        } else {
            return false;
        }
    }

    SignUp(SignupData: { username: string; email: string; password: string; }) {
        return this.http.post('http://localhost:3000/signup', SignupData).pipe(
           map(data => {
               return data || {};
           })
        );
    }

    Login(loginData: { username: string; password: string; }): Observable<any> {
        return this.http.post<{ token: string}>('http://localhost:3000/login', loginData).pipe(
            map(data => {
                localStorage.setItem('currentUser', data.token);
                console.log(data.token, 'data token');
                this.user = data.token;
                return data || {};
            })
        );
    }

}
