import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {FundsManageRoutingModule} from './funds-manage-routing.module';
import {FundsListComponent} from './funds-list/funds-list.component';
import {UserBalanceListComponent} from './user-balance-list/user-balance-list.component';
import {RefundListComponent} from './refund-list/refund-list.component';
import {MonthlySettingComponent} from './monthly-setting/monthly-setting.component';

import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';

import {OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OwlDateTimeModule,} from 'ng-pick-datetime';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime-moment';
import {SmartTableService} from '../../@core/data/smart-table.service';
import {MY_MOMENT_FORMATS} from '../order-manage/order-manage.module';

import {CustomRenderComponent} from './user-balance-list/custom-render-component';
import {UserBalanceListModalComponent} from './user-balance-list/user-balance-list-modal/user-balance-list-modal.component';

import {RefundListModalComponent} from './refund-list/refund-list-modal/refund-list-modal.component';
import {RefundListCustomRenderComponent} from './refund-list/custom-render-component';

import {FundsListCustomRenderComponent} from './funds-list/custom-render-component';
import {FundsListModalComponent} from './funds-list/funds-list-modal/funds-list-modal.component';

import {SettlementListComponent} from './settlement-list/settlement-list.component';
import {SettlementListModalComponent} from './settlement-list/settlement-list-modal/settlement-list-modal.component';
import {SettlementListCustomRenderComponent} from './settlement-list/custom-render-component';
import {SettlementSellerListComponent} from './settlement-seller-list/settlement-seller-list.component';


@NgModule({
    declarations: [
        FundsListComponent,
        UserBalanceListComponent,
        RefundListComponent,
        MonthlySettingComponent,
        CustomRenderComponent,
        UserBalanceListModalComponent,
        RefundListCustomRenderComponent,
        RefundListModalComponent,
        FundsListCustomRenderComponent,
        FundsListModalComponent,
        SettlementListComponent,
        SettlementListCustomRenderComponent,
        SettlementListModalComponent,
        SettlementSellerListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        FundsManageRoutingModule,
        ThemeModule,
        Ng2SmartTableModule,
        OwlDateTimeModule,
        // OwlNativeDateTimeModule,
        OwlMomentDateTimeModule,
    ],
    providers: [
        SmartTableService,
        {provide: OWL_DATE_TIME_LOCALE, useValue: 'ch'},
        {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
        // {provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS},
    ],
    entryComponents: [
        CustomRenderComponent,
        UserBalanceListModalComponent,
        RefundListCustomRenderComponent,
        RefundListModalComponent,
        FundsListCustomRenderComponent,
        FundsListModalComponent,
        SettlementListCustomRenderComponent,
        SettlementListModalComponent,
    ],
})
export class FundsManageModule {
}
