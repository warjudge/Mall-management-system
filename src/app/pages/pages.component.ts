import {Component, OnInit} from '@angular/core';

import {PagesMenu} from './pages-menu';
import {DataService} from '../service/dataService';

@Component({
    selector: 'ngx-pages',
    styleUrls: ['pages.component.scss'],
    template: `
        <ngx-sample-layout>
            <nb-menu [items]="menu"></nb-menu>
            <router-outlet></router-outlet>
        </ngx-sample-layout>
    `,
})
export class PagesComponent implements OnInit {

    menu: any;

    constructor(private dataService: DataService,
                private pageMenu: PagesMenu) {
    }

    ngOnInit() {
        this.menu = this.pageMenu.getMenu();
    }
}
