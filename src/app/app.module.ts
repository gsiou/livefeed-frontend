import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { FormsModule }             from '@angular/forms';
import { HttpModule }              from '@angular/http';

import { AppComponent }            from './app.component';
import { ArticleComponent }        from './timeline/article.component';
import { LoginComponent }          from './login/login.component';
import { RegisterComponent }       from './register/register.component';
import { TimelineComponent }       from './timeline/timeline.component';
import { MenuComponent }           from './menu/menu.component';
import { HomeComponent }           from './home/home.component';

import { AuthGuard }               from './guards/auth.guard';
import { AuthenticationService }   from './services/authentication.service';
import { FeedService }             from './services/feed.service';
import { AlertService }            from './services/alert.service';
import { APP_CONFIG, AppConfig }   from './app.config';

import { routing }                 from './app.routing';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing ],
  declarations: [ AppComponent, LoginComponent, TimelineComponent, RegisterComponent, ArticleComponent, MenuComponent, HomeComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [
                    AuthGuard,
                    AuthenticationService,
                    { provide: APP_CONFIG, useValue: AppConfig },
                    FeedService,
                    AlertService
                ]
})
export class AppModule { }
