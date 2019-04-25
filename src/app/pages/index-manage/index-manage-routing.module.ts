import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityEntranceComponent} from './activity-entrance/activity-entrance.component';
import {AdvertisingListComponent} from './advertising-list/advertising-list.component';
import {RecommendCommodityComponent} from './recommend-commodity/recommend-commodity.component';
import {SpecialOfferComponent} from './special-offer/special-offer.component';
import {AdListComponent} from './ad-list/ad-list.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'activity-entrance',
                component: ActivityEntranceComponent,
            },
            {
                path: 'advertising-list',
                component: AdvertisingListComponent,
            },
            {
                path: 'ad-list',
                component: AdListComponent,
            },
            {
                path: 'recommend-commodity',
                component: RecommendCommodityComponent,
            }, {
                path: 'special-offer',
                component: SpecialOfferComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IndexManageRoutingModule {
}
