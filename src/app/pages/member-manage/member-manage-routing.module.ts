import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MemberListComponent} from './member-list/member-list.component';
import {PartnerListComponent} from './partner-list/partner-list.component';
import {MemberBenefitsSettingComponent} from './member-benefits-setting/member-benefits-setting.component';
import {MemberCommissionSettingComponent} from './member-commission-setting/member-commission-setting.component';
import {MemberCommoditySettingComponent} from './member-commodity-setting/member-commodity-setting.component';
import {MemberLevelSettingComponent} from './member-level-setting/member-level-setting.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'member-list',
                component: MemberListComponent,
            },
            {
                path: 'partner-list',
                component: PartnerListComponent,
            },
            {
                path: 'member-benefits-setting',
                component: MemberBenefitsSettingComponent,
            },
            {
                path: 'member-commission-setting',
                component: MemberCommissionSettingComponent,
            },
            {
                path: 'member-commodity-setting',
                component: MemberCommoditySettingComponent,
            },
            {
                path: 'member-level-setting',
                component: MemberLevelSettingComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MemberManageRoutingModule {
}
