import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService {
    private token: string;
    private expiresInDuration: number;
    private timerRef: any;
    private authenticated: boolean;

    constructor(private http: HttpClient, private router: Router) { }

    getToken(): string {

        return this.token;
    }
    
    getAuthenticated(): boolean {

        return this.authenticated;
    }

    signUp(url: string, user: User): void {
        this.http.post<any>(url, user)
        .subscribe({
            next: responseData => {
                this.router.navigate(['/log-in']);

            },
            error: err => {
                console.log('Error: ', err.message);

            }
        })
        
    }

    logIn(url: string, user: User): void {
        this.http.post<{message: string, token: string, expiresIn: number}>(url, user)
        .subscribe({
            next: responseData => {
                this.authenticated = true;
                this.token = responseData.token;
                this.expiresInDuration = responseData.expiresIn;
                this.setTimer(this.expiresInDuration);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + (this.expiresInDuration * 1000));
                localStorage.setItem('token', responseData.token);
                localStorage.setItem('expiresIn', expirationDate.toISOString());
                this.router.navigate(['/']);
                
            },
            error: err => {
                console.log('Error: ', err.message);

            }

        })

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

        if(!token || !expirationDate)
            return undefined;

        return {
            token: token,
            expiresIn: expirationDate

        }

    }

    autoAuthUser(): void {
        const authInfo = this.getAuthData();

        if(!authInfo)
            return undefined;

        const now = new Date();
        const expiresInDuration = authInfo.expiresIn.getTime() - now.getTime();

        if(expiresInDuration > 0) {
            this.token = authInfo.token;
            this.authenticated = true;
            this.setTimer(expiresInDuration/1000);

        } else {
            this.logOut();
            this.router.navigate(['/log-in']);

        }

    }

    

    private setTimer(duration: number) {
        this.timerRef = setTimeout(() => {
            this.logOut();

        } , duration * 1000)
    }

}