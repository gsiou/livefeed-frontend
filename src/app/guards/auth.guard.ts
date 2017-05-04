import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private router: Router){}

    canActivate(){
        if (localStorage.getItem("authUser")) {
            let now = new Date();
            let expDate = new Date(now.setMinutes(now.getMinutes() + 60));
            let tokenDate = new Date(parseInt(localStorage.getItem("authDate")));
            if (tokenDate > expDate) {
                // Refresh token
                console.log("TODO: Refresh token");
            }
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
