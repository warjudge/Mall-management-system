import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FundsListComponent} from './funds-list/funds-list.component';
import {UserBalanceListComponent} from './user-balance-list/user-balance-list.component';
import {RefundListComponent} from './refund-list/refund-list.component';
import {MonthlySettingComponent} from './monthly-setting/monthly-setting.component';
import {SettlementListComponent} from './settlement-list/settlement-list.component';
import {SettlementSellerListComponent} from './settlement-seller-list/settlement-seller-list.component';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'funds-list',
                component: FundsListComponent,
            },
            {
                path: 'settlement-list',
                component: SettlementListComponent,
            },
            {
                path: 'settlement-seller-list',
                component: SettlementSellerListComponent,
            },
            {
                path: 'user-balance-list',
                component: UserBalanceListComponent,
            },
            {
                path: 'refund-list',
                component: RefundListComponent,
            }, {
                path: 'monthly-setting',
                component: MonthlySettingComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FundsManageRoutingModule {
}
