import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { tap, switchMap } from 'rxjs/operators';

import { Auth, emailReg } from '@models/auth.model';
import { User } from '@models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private emailRegistered$ = new BehaviorSubject<string | null>(null); 
  private user$ = new BehaviorSubject<User | null>(null); 
  apiUrl = "https://fake-trello-api.herokuapp.com/api/v1/auth";

  emailRegistered = this.emailRegistered$.asObservable();
  user = this.user$.asObservable();
  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, { email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap((rta) => this.getProfile())
    )
  }

  register(name: string, email: string, password: string) {
    return this.http.post<emailReg>(`${this.apiUrl}/register`, {
      name,
      email,
      password
    })
    .pipe(
      tap(response => this.emailRegistered$.next(email))
    );
  }

    getProfile(){
      const token = this.tokenService.getToken();
      const headers =new HttpHeaders();
      headers.set('Authorization', `Bearer ${token}`);
      return this.http.get<User>(`${this.apiUrl}/profile`,{
        headers: {
          Authorization: `Bearer ${token}`,//Bearer is the authorization type used in this case
          'Content-type': 'application/json' 
        }
      })
      .pipe(
        tap(user => this.user$.next(user))
      );
    }

}
