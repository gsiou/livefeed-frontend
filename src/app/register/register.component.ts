import { Component, OnInit }       from '@angular/core';
import { AuthenticationService }   from '../services/authentication.service';

@Component({
  templateUrl: './register.component.html',
})

export class RegisterComponent implements OnInit {

    model: any = {};
    error: String = "";
    
    constructor(private authenticationService: AuthenticationService) {}

    ngOnInit() {
        this.authenticationService.logout();
    }

    register() {
        console.log(this.model.email);
        this.authenticationService.register(this.model.email, this.model.password)
        .subscribe(
            (success) => {
                if (success) {
                    console.log("Registered");
                }
                else {
                    this.error = ("Failed to register");
                }
            },
            (error) => {
                this.error = "Please provide all required information";
            }
        )
    }
}
