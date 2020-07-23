import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { HttpResponseStatus } from '../../models';

export interface ResetPasswordDto {
    newPassword: string;
    newPasswordToken: string;
}

@Injectable()
export class AuthVerificationService {
    protected key = 'auth_app_temp_user';

    constructor(private httpClient: HttpClient) {
    }

    resendEmailVerification(email: string): Observable<HttpResponseStatus> {
        return this.httpClient.get<HttpResponseStatus>(`${environment.BASE_URL}/auth/resend-verification/${email}`);
    }


    verifyAccount(token: string) {
        return this.httpClient.get<HttpResponseStatus>(`${environment.BASE_URL}/auth/verify/${token}`);
    }

    resetPassword(config: ResetPasswordDto) {
        return null;
    }

    setTemporaryUserVerification({email, username}: { username: string; email: string; }): void {
        this.set({email, username});
    }

    getTemporaryUserVerification(): { username: string; email: string; } {
        return this.get();
    }

    clearTemporaryUserVerification(): void {
        return this.clear();
    }

    protected parseToken(value: string): { username: string; email: string } {
        try {
            return JSON.parse(value);
        } catch (e) {

        }

        return null;
    }

    // TODO: Refactor method.
    private get(): { username: string; email: string; } {
        const raw = localStorage.getItem(this.key);
        return this.unwrap(raw);
    }

    // TODO: Refactor method.
    private set(token: { username: string; email: string }): void {
        const raw = this.wrap(token);
        localStorage.setItem(this.key, raw);
    }

    // TODO: Refactor method.
    private clear() {
        localStorage.removeItem(this.key);
    }

    private wrap({username, email}): string {
        return JSON.stringify({username, email});
    }

    private unwrap(value: string) {
        let token: { username: string; email: string; };
        const tokenPack: { username: string; email: string } = this.parseToken(value);

        if (tokenPack) {
            token = tokenPack;
        }

        return token;
    }
}
