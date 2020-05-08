import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class MeetIdResolver implements Resolve<string> {

    constructor() {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | Promise<string> | string {
        // return route.params.id;
        return '5b7ee283-8ddd-4ec8-a2f1-77b827b8dd1b';
    }
}
