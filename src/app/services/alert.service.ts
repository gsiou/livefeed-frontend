import { Http, Response } from '@angular/http';
import { Injectable, Inject }      from '@angular/core';
import { Observable }              from 'rxjs/Rx';
import { APP_CONFIG, IAppConfig }  from '../app.config';

@Injectable()
export class AlertService{
    constructor(private http: Http, @Inject(APP_CONFIG) private config: IAppConfig) {}

    addAlert(alert: string): Observable<Boolean> {
        let token = JSON.parse(localStorage.getItem('authUser')).token;
        return this.http.post(this.config.apiEndpoint + '/api/alert', { alert: alert, token: token })
        .map((response: Response) => {
            let res = response.json();
            if (res.success === true) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
