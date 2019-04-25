/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from './@core/utils/analytics.service';
import {DataService} from './service/dataService';
import {Router} from '@angular/router';

@Component({
    selector: 'ngx-app',
    template: `
        <router-outlet></router-outlet>
        <ngx-spinner
                bdColor="rgba(51,51,51,0.4)"
                size="medium"
                color="#fff"
                type="square-loader">
            <!--<p style="font-size: 20px; color: white">Loading...</p>-->
        </ngx-spinner>
    `,
})
export class AppComponent implements OnInit {

    constructor(private analytics: AnalyticsService,
                private dataService: DataService,
                private route: Router) {
    }

    ngOnInit(): void {
        const sid = sessionStorage.getItem('sid');
        const permission = sessionStorage.getItem('permission');
        this.dataService.sid = sid ? sid : '';
        if (permission) {
            this.dataService.setPermission(JSON.parse(permission));
        } else {
            this.route.navigateByUrl('/');
        }
        this.analytics.trackPageViews();
        document.onkeydown = function (event) {
            const code = event.keyCode;
            if (code === 13) {
                // return false;
            }
        };
    }
}
