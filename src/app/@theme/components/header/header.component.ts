import {Component, Input, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {UserService} from '../../../@core/data/users.service';
import {AnalyticsService} from '../../../@core/utils/analytics.service';
import {LayoutService} from '../../../@core/data/layout.service';
import {DataService} from '../../../service/dataService';
import {Router} from '@angular/router';

@Component({
    selector: 'ngx-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

    @Input() position = 'normal';

    user: any;
    userName: any;

    userMenu = [{title: '登出'}];

    constructor(private sidebarService: NbSidebarService,
                private menuService: NbMenuService,
                private userService: UserService,
                private analyticsService: AnalyticsService,
                private layoutService: LayoutService,
                private dataService: DataService,
                private router: Router) {
    }

    ngOnInit() {
        // this.userName = this.dataService.userName;
        this.userName = sessionStorage.userName;
        this.userService.getUsers()
            .subscribe((users: any) => this.user = users.nick);
    }

    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, 'menu-sidebar');
        this.layoutService.changeLayoutSize();
        return false;
    }

    logout() {
        this.dataService.sid = '';
        sessionStorage.setItem('userName', '');
        sessionStorage.setItem('sid', '');
        sessionStorage.setItem('permission', '');
        this.router.navigateByUrl('/');
    }


    toggleSettings(): boolean {
        this.sidebarService.toggle(false, 'settings-sidebar');

        return false;
    }

    goToHome() {
        this.menuService.navigateHome();
    }

    startSearch() {
        this.analyticsService.trackEvent('startSearch');
    }
}
