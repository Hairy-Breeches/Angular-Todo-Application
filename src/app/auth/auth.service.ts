import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService {
    private token: string;

    constructor(private http: HttpClient, private router: Router) { }

    getToken(): string {

        return this.token;
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
        this.http.post<{message: string, token: string}>(url, user)
        .subscribe({
            next: responseData => {
                this.token = responseData.token;
                this.router.navigate(['/']);

            },
            error: err => {
                console.log('Error: ', err.message);

            }

        })

    }

    logOut(): void {
        this.token = null;
        this.router.navigate(['/log-in']);

    }

}