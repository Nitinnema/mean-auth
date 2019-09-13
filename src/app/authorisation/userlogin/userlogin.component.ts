import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-user-login',
    templateUrl: './userlogin.component.html',
    styleUrls: ['./userlogin.component.css']
})

export class UserLoginComponent {

    hide = true;
    constructor(public router: Router, private auth: AuthorizationService, private snackBar: MatSnackBar) {}

    onSignUp(signupForm: NgForm) {
        if (signupForm.invalid) {
            return;
        }
        const signUpData = {
            username: signupForm.value.username,
            email: signupForm.value.email,
            password: signupForm.value.password
        };
        this.auth.SignUp(signUpData).subscribe(data => {
            console.log(data);
        });
    }

    onLogin(loginForm: NgForm) {
        if (loginForm.invalid) {
            return;
        }
        const loginData = {
            username: loginForm.value.username,
            password: loginForm.value.password
        };
        // const navigationExtras: NavigationExtras = {
        //     queryParams: {
        //         firstname: loginData.username
        //     }
        // };
        this.auth.Login(loginData).subscribe(data => {
            this.router.navigate(['/welcome']);
        });
    }

    openSnackBar() {
        // Open Snack Bar for showing message
        if (this.auth.isLoggedin()) {
            console.log('logged');
            this.snackBar.open('Logged in Succesfully', 'OK', {
                duration: 2000
            });
        } else {
            console.log('fail');
            this.snackBar.open('Wrong Password', '', {
                duration: 2000
            });
        }
    }

}
