import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private tokenSubject: BehaviorSubject<string>;

    constructor(private http: HttpClient) {
        this.tokenSubject = new BehaviorSubject<string>(localStorage.getItem('accessToken'));
    }

    login(username: string, password: string): any {
        return this.http.post<any>(`${environment.BASE_URL}/auth/login`, {username, password})
            .pipe(tap(payload => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.setToken(payload.accessToken);
                localStorage.setItem('accessToken', payload.accessToken);
            }));
    }

    getToken(): string {
        return this.tokenSubject.value;
    }

    setToken(token: string): void {
        this.tokenSubject.next(token);
    }

    logout(): void {
        // remove user from local storage to log user out
        this.setToken(null);
        localStorage.removeItem('accessToken');
    }
}
