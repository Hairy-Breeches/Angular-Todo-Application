import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from 'environments/environment';

const BACKEND_URL = environment.apiUrl + 'user/';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string;
  private expiresInDuration: number;
  private timerRef: any;
  private authenticated: boolean;

  constructor(private http: HttpClient, private router: Router) {}

  getToken(): string {
    return this.token;
  }

  getAuthenticated(): boolean {
    return this.authenticated;
  }

  signUp(user: User): void {
    this.http.post<any>(BACKEND_URL + 'sign-up', user).subscribe({
      next: () => {
        this.router.navigate(['/log-in']);
      },
      error: (err) => {
        console.log('Error: ', err.message);
      },
    });
  }

  logIn(user: User): void {
    this.http
      .post<{ message: string; token: string; expiresIn: number }>(
        BACKEND_URL + 'log-in',
        user
      )
      .subscribe({
        next: (responseData) => {
          this.authenticated = true;
          this.token = responseData.token;
          this.expiresInDuration = responseData.expiresIn;
          this.setTimer(this.expiresInDuration);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + this.expiresInDuration * 1000
          );
          localStorage.setItem('token', responseData.token);
          localStorage.setItem('expiresIn', expirationDate.toISOString());
          this.router.navigate(['todos']);
        },
        error: (err) => {
          console.log('Error: ', err.message);
        },
      });
  }

  logOut(): void {
    this.authenticated = false;
    this.token = null;
    clearTimeout(this.timerRef);
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');

    this.router.navigate(['/log-in']);
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = new Date(localStorage.getItem('expiresIn'));

    if (!token || !expirationDate) return undefined;

    return {
      token: token,
      expiresIn: expirationDate,
    };
  }

  autoAuthUser(): void {
    const authInfo = this.getAuthData();

    if (!authInfo) return undefined;

    const now = new Date();
    const expiresInDuration = authInfo.expiresIn.getTime() - now.getTime();

    if (expiresInDuration > 0) {
      this.token = authInfo.token;
      this.authenticated = true;
      this.setTimer(expiresInDuration / 1000);
    } else {
      this.logOut();
      this.router.navigate(['/log-in']);
    }
  }

  private setTimer(duration: number) {
    this.timerRef = setTimeout(() => {
      this.logOut();
    }, duration * 1000);
  }
}
