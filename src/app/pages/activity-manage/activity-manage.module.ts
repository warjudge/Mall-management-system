import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ActivityManageRoutingModule} from './activity-manage-routing.module';
import {ActivityListComponent} from './activity-list/activity-list.component';
import {ActivityCommodityListComponent} from './activity-commodity-list/activity-commodity-list.component';
import {FormsModule} from '@angular/forms';
import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OwlDateTimeModule} from 'ng-pick-datetime';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime-moment';
import {SmartTableService} from '../../@core/data/smart-table.service';
import {MY_MOMENT_FORMATS} from '../order-manage/order-manage.module';

import {ActivityListModalComponent} from './activity-list/activity-list-modal/activity-list-modal.component';
import {ActivityListCustomRenderComponent} from './activity-list/custom-render-component';

import {ActivityCommodityListModalComponent,} from './activity-commodity-list/activity-commodity-list-modal/activity-commodity-list-modal.component';
import {ActivityCommodityListCustomRenderComponent} from './activity-commodity-list/custom-render-component';
import {CreateActivityComponent} from './create-activity/create-activity.component';

@NgModule({
    declarations: [
        ActivityListComponent,
        ActivityCommodityListComponent,
        ActivityListModalComponent,
        ActivityListCustomRenderComponent,
        ActivityCommodityListModalComponent,
        ActivityCommodityListCustomRenderComponent,
        CreateActivityComponent,
    ],
    imports: [
        CommonModule,
        ActivityManageRoutingModule,
        FormsModule,
        ThemeModule,
        Ng2SmartTableModule,
        OwlDateTimeModule,
        // OwlNativeDateTimeModule,
        OwlMomentDateTimeModule,
    ],
    providers: [
        SmartTableService,
        {provide: OWL_DATE_TIME_LOCALE, useValue: 'zh-cn'},
        {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
        // {provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS},
    ],
    entryComponents: [
        ActivityListModalComponent,
        ActivityListCustomRenderComponent,
        ActivityCommodityListModalComponent,
        ActivityCommodityListCustomRenderComponent,
        CreateActivityComponent,
    ],
})
export class ActivityManageModule {
}
