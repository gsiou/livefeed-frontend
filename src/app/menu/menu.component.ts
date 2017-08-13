import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    templateUrl: './menu.component.html',
    selector: 'mainmenu'
})

export class MenuComponent {
    @Output() onShowNewFeedForm = new EventEmitter<boolean>();
    private newFeedForm: boolean = false;
    private username: string;

    constructor(private authenticationService: AuthenticationService, private router: Router) {
        this.username = authenticationService.getUser();
    };

    showNewFeedForm() {
        this.newFeedForm = !this.newFeedForm;
        this.onShowNewFeedForm.emit(this.newFeedForm);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/']);
    }
}