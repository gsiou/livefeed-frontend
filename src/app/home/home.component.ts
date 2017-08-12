import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
@Component({
    templateUrl: './home.component.html',
})

export class HomeComponent {
    constructor(private authenticationService: AuthenticationService, private router: Router) {
        if(authenticationService.userIsLogged()) {
            this.router.navigate(['/timeline']);
        }
    }
}
