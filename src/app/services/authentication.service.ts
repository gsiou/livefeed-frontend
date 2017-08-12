import { Http, Headers, Response } from '@angular/http';
import { Injectable, Inject }      from '@angular/core';
import { Observable }              from 'rxjs';
import { APP_CONFIG, IAppConfig }  from '../app.config';
import 'rxjs/add/operator/map'


@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http, @Inject(APP_CONFIG) private config: IAppConfig) {

    }

    login(email: string, password: string): Observable<boolean> {
      console.log("Hello World");
      return this.http.post(this.config.apiEndpoint + '/authenticate',
        { email: email, password: password })
        .map((response: Response) => {
            let res = response.json();
            if (res.success === true) {
                localStorage.setItem('authUser', JSON.stringify( { email: email, token: res.token } ));
                localStorage.setItem('authDate', Date.now().toString());
                console.log(localStorage.getItem('authUser'));
                console.log(localStorage.getItem('authDate'));
                return true;
            }
            else {
                return false;
            }
        });
    }

    logout() {
        localStorage.removeItem('authUser');
        localStorage.removeItem('authDate');
        localStorage.removeItem('storedTimeline'); // remove anything we had in store for privacy
    }

    register(email: string, password: string): Observable<boolean> {
        console.log("Trying to register...");
        return this.http.post(this.config.apiEndpoint + '/register',
        { email: email, password: password })
        .map((response: Response) => {
            console.log(response);
            return true;
        });
    }

    getUser() {
        return JSON.parse(localStorage.getItem('authUser')).email;
    }

    userIsLogged() {
        // TODO: fix this properly
        if(localStorage.getItem('authUser') !== null) {
            return true;
        }
        else {
            return false;
        }
    }
}
