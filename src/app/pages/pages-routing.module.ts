import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';
import {IndexComponent} from './index/index.component';


const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [{
        path: 'index',
        component: IndexComponent,
    }, {
        path: 'commodity-manage',
        loadChildren: './commodity-manage/commodity-manage.module#CommodityManageModule',
    }, {
        path: 'order-manage',
        loadChildren: './order-manage/order-manage.module#OrderManageModule',
    }, {
        path: 'user-manage',
        loadChildren: './user-manage/user-manage.module#UserManageModule',
    }, {
        path: 'index-manage',
        loadChildren: './index-manage/index-manage.module#IndexManageModule',
    }, {
        path: 'activity-manage',
        loadChildren: './activity-manage/activity-manage.module#ActivityManageModule',
    }, {
        path: 'member-manage',
        loadChildren: './member-manage/member-manage.module#MemberManageModule',
    }, {
        path: 'category-manage',
        loadChildren: './category-manage/category-manage.module#CategoryManageModule',
    }, {
        path: 'funds-manage',
        loadChildren: './funds-manage/funds-manage.module#FundsManageModule',
    }, {
        path: 'message-manage',
        loadChildren: './message-manage/message-manage.module#MessageManageModule',
    }, {
        path: 'system-manage',
        loadChildren: './system-manage/system-manage.module#SystemManageModule',
    },
        {
            path: 'miscellaneous',
            loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
        }, {
            path: '',
            redirectTo: 'index',
            pathMatch: 'full',
        }, {
            path: '**',
            component: NotFoundComponent,
        }],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {
}
