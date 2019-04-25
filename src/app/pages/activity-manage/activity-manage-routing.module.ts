import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityListComponent} from './activity-list/activity-list.component';
import {ActivityCommodityListComponent} from './activity-commodity-list/activity-commodity-list.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'activity-list',
                component: ActivityListComponent,
            },
            {
                path: 'activity-commodity-list',
                component: ActivityCommodityListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ActivityManageRoutingModule {
}
