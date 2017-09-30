import { Component, OnInit }       from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService }   from '../services/authentication.service';
@Component({
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {

    model: any = {};
    error: string = "";
    constructor(private authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
      this.authenticationService.logout();
      console.log(this.route.paramMap);
      this.route.params.subscribe(params => {
        if (params.expired) {
          this.error = "Your session has expired. Please login again.";
      });
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
