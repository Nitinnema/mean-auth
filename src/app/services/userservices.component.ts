import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})

export class UserService {

    constructor(private http: HttpClient) { }

    getUser(): Observable<any> {
        return this.http.get('http://localhost:3000/users').pipe(
            map(data => {
                return data || {};
            })
        );
    }

    getCities(): Observable<any> {
        return this.http.get('https://api.myjson.com/bins/pesin').pipe(
            map(data => {
                return data || {};
            })
        );
    }

    saveUser(userData: { name: string; phone: string; email: string; car: string; }) {
        return this.http.post('http://localhost:3000/users', userData).pipe(
            map(data => {
                return data || {};
            })
        );
    }

    deleteUser(userid: string) {
        return this.http.delete('http://localhost:3000/user/' + userid).pipe(
            map(data => {
                return data || {};
            })
        );
    }

    getSingleUser(userId: string): Observable<any> {
        return this.http.get('http://localhost:3000/user/' + userId).pipe(
            map(data => {
                return data || {};
            })
        );
    }

    updateUser(userId: string, userDetail: { name: string; phone: string; email: string; car: string; }) {
        return this.http.put('http://localhost:3000/user/' + userId, userDetail).pipe(
            map(data => {
                return data || {};
            })
        );
    }

}
