import  { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../user.model';

import { AuthService } from '../auth.service';

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
})
export class LogInComponent {
    constructor(private authService: AuthService) { }

    onLogIn(logInForm: NgForm): void {
        if(!logInForm.valid)
            return;

        const user = new User(logInForm.value.email, logInForm.value.password);
        const url = 'http://localhost:3000/api/user/log-in';

        this.authService.logIn(url, user);
    }

}