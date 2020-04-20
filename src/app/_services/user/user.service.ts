import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../_models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserMe(): any {
    return this.http.get<User>(`http://localhost:3000/users/me`);
  }
}
