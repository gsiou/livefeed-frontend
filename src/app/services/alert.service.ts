import { Http, Response, URLSearchParams } from '@angular/http';
import { Injectable, Inject }      from '@angular/core';
import { Observable }              from 'rxjs/Rx';
import { APP_CONFIG, IAppConfig }  from '../app.config';

import { Alert }                   from '../models/alert';

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

    fetchAlerts(): Observable<Alert[]> {
        let token = JSON.parse(localStorage.getItem('authUser')).token;
        let params: URLSearchParams = new URLSearchParams();
        params.set("token", token);
        return this.http.get(this.config.apiEndpoint + '/api/alerts/', { search: params })
        .map((response: Response) => {
            let res = response.json();
            let alerts: Alert[] = [];
            for(var i = 0; i < res.alerts.length ; i++) {
                alerts.push(new Alert());
                alerts[i].alertWord = res.alerts[i];
            }

            return alerts;
        });
    }
}
