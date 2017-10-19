import { Component, EventEmitter, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  templateUrl: './menu.component.html',
  selector: 'mainmenu'
})

export class MenuComponent {
  @Input()  feeds: Feed[];
  @Output() onShowNewFeedForm = new EventEmitter();
  @Output() onSearch = new EventEmitter<string>();
  @Output() onManage = new EventEmitter();
  @Output() onSelectFeed = new EventEmitter<Feed>();
  @ViewChild('searchbox') searchBox:ElementRef;
  newFeedForm: boolean = false;
  username: string;
  showSearch: boolean = false;
  searchTerms: string;
  activeFeed: Feed = null;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.username = authenticationService.getUser();
  };

  showNewFeedForm() {
    this.newFeedForm = !this.newFeedForm;
    this.onShowNewFeedForm.emit();
  }

  toggleSearchForm() {
    this.showSearch = !this.showSearch;
  }

  focusSearch() {
    if(this.showSearch) {
      setTimeout(() => {this.searchBox.nativeElement.focus()}, 100); // way too hacky but works
    }
  }

  feedSelect() {
    this.onSelectFeed.emit(this.activeFeed);
  }

  showManage() {
    this.onManage.emit();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

  search() {
    this.onSearch.emit(this.searchTerms);
  }
}
