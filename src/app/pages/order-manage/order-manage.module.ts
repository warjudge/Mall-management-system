import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrderManageRoutingModule} from './order-manage-routing.module';
import {OrderManageComponent} from './order-manage/order-manage.component';
import {OrderListComponent} from './order-list/order-list.component';
import {ReturnProcessingComponent} from './return-processing/return-processing.component';
import {ThemeModule} from '../../@theme/theme.module';
import {SmartTableService} from '../../@core/data/smart-table.service';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OwlDateTimeModule,} from 'ng-pick-datetime';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime-moment';
import {CustomRenderComponent} from './order-list/custom-render-component';
import {CustomCommodityComponent} from './order-list/custom-commodity-component';
import {OrderListModalComponent} from './order-list/order-list-modal/order-list-modal.component';

import {ReturnProcessingCustomRenderComponent} from './return-processing/custom-render-component';
import {ReturnProcessingModalComponent} from './return-processing/return-processing-modal/return-processing-modal.component';
import {NgxAddressModule} from 'ngx-address';
import {AddressModule} from '../address/address.module';
import {NgxPaginationModule} from 'ngx-pagination';
// import {AddressDataChinaModule} from "ngx-address/data/china";

// export const MY_NATIVE_FORMATS = {
//     fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'},
//     datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
//     timePickerInput: {hour: 'numeric', minute: 'numeric'},
//     monthYearLabel: {year: 'numeric', month: 'short'},
//     dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
//     monthYearA11yLabel: {year: 'numeric', month: 'long'},
// };
export const MY_MOMENT_FORMATS = {
    parseInput: 'YYYY-MM-DD HH:mm',
    fullPickerInput: 'YYYY-MM-DD HH:mm',
    datePickerInput: 'l',
    timePickerInput: 'LT',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
};

@NgModule({
    declarations: [
        OrderManageComponent,
        OrderListComponent,
        ReturnProcessingComponent,
        CustomRenderComponent,
        CustomCommodityComponent,
        OrderListModalComponent,
        ReturnProcessingCustomRenderComponent,
        ReturnProcessingModalComponent,
    ],
    imports: [
        CommonModule,
        OrderManageRoutingModule,
        ThemeModule,
        Ng2SmartTableModule,
        OwlDateTimeModule,
        OwlMomentDateTimeModule,
        NgxAddressModule,
        AddressModule,
        NgxPaginationModule,
    ],
    providers: [
        SmartTableService,
        {provide: OWL_DATE_TIME_LOCALE, useValue: 'zh-cn'},
        {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
    ],
    entryComponents: [
        CustomRenderComponent,
        CustomCommodityComponent,
        OrderListModalComponent,
        ReturnProcessingCustomRenderComponent,
        ReturnProcessingModalComponent,
    ],
})
export class OrderManageModule {
}
