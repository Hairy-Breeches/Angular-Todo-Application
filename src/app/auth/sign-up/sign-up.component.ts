import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";

import { User } from "../user.model";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
    constructor(private authService: AuthService) { }

    onSignUp(signUpform: NgForm): void {
        if(!signUpform.valid)
            return;

        const user = new User(signUpform.value.email, signUpform.value.password);
        const url = 'http://localhost:3000/api/user/sign-up';

        this.authService.signUp(url, user);
    }
}