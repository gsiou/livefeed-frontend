import { Component, OnInit }       from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService }   from '../services/authentication.service';
@Component({
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {

    model: any = {};
    error: string = "";
    constructor(private authenticationService: AuthenticationService, private router: Router) {}

    ngOnInit() {
        this.authenticationService.logout();
    }

    login() {
        console.log(this.model.email);
        this.authenticationService.login(this.model.email, this.model.password)
        .subscribe(
            (success) => {
                if (success) {
                    console.log("Logged in");
                    localStorage.setItem('storedTimeline', null);
                    this.router.navigate(['/']);
                }
                else {
                    this.error = "Invalid email/password";
                    console.log("Failed to log in");
                }
            },
            (error) => {
                this.error = "Please give email and password";
            }
        )
    }
}
