import { Component, OnInit }       from '@angular/core';
import { AuthenticationService }   from '../services/authentication.service';
import { Router }                  from '@angular/router';

@Component({
  templateUrl: './register.component.html',
})

export class RegisterComponent implements OnInit {

    model: any = {};
    error: String = "";
    success: boolean = false;

    constructor(private authenticationService: AuthenticationService, private router: Router) {}

    ngOnInit() {
        this.authenticationService.logout();
    }

    register() {
        if(this.model.password !== this.model.password2) {
            this.error = "Passwords do not match";
            this.model.password = "";
            this.model.password2 = "";
        }
        else if(this.model.password === undefined || this.model.email === undefined) {
            this.error = "All fields are required";
        }
        else {
            this.authenticationService.register(this.model.email, this.model.password)
            .subscribe(
                (success) => {
                    this.error = "";
                    this.success = true;
                },
                (error) => {
                    // TODO: add more cases here
                    this.error = "A user with that email already exists";
                }
            );
        }
    }
}
