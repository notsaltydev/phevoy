import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private tokenSubject: BehaviorSubject<string>;

    constructor(private http: HttpClient) {
        this.tokenSubject = new BehaviorSubject<string>(localStorage.getItem('accessToken'));
    }

    login(username: string, password: string): any {
        return this.http.post<any>(`http://localhost:3000/auth/login`, {username, password})
            .pipe(tap(payload => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.tokenSubject.next(payload.accessToken);
                localStorage.setItem('accessToken', payload.accessToken);
            }));
    }

    getToken(): string {
        return this.tokenSubject.value;
    }

    logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem('accessToken');
    }
}
