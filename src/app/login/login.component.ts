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
        this.authenticationService.login(this.model.email, this.model.password)
        .subscribe(
            (success) => {
                if (success) {
                    localStorage.removeItem("storedTimeline");
                    this.router.navigate(['/timeline']);
                }
                else {
                    this.error = "Invalid email/password";
                }
            },
            (error) => {
                this.error = "Please give email and password";
            }
        )
    }
}
