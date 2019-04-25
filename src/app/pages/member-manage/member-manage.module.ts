import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule} from '@angular/forms';
import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OwlDateTimeModule} from 'ng-pick-datetime';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime-moment';
import {SmartTableService} from '../../@core/data/smart-table.service';
import {MY_MOMENT_FORMATS} from '../order-manage/order-manage.module';

import {MemberManageRoutingModule} from './member-manage-routing.module';
import {MemberListComponent} from './member-list/member-list.component';
import {PartnerListComponent} from './partner-list/partner-list.component';
import {MemberLevelSettingComponent} from './member-level-setting/member-level-setting.component';
import {MemberBenefitsSettingComponent} from './member-benefits-setting/member-benefits-setting.component';
import {MemberCommissionSettingComponent} from './member-commission-setting/member-commission-setting.component';
import {MemberCommoditySettingComponent} from './member-commodity-setting/member-commodity-setting.component';
import {MemberListModalComponent} from './member-list/member-list-modal/member-list-modal.component';
import {MemberListCustomRenderComponent} from './member-list/custom-render-component';
import {AddMemberComponent} from './add-member/add-member.component';
import {PartnerListModalComponent} from './partner-list/partner-list-modal/partner-list-modal.component';
import {PartnerListCustomRenderComponent} from './partner-list/custom-render-component';
import {AddPartnerComponent} from './add-partner/add-partner.component';


@NgModule({
    declarations: [
        MemberListComponent,
        PartnerListComponent,
        MemberLevelSettingComponent,
        MemberBenefitsSettingComponent,
        MemberCommissionSettingComponent,
        MemberCommoditySettingComponent,
        MemberListModalComponent,
        MemberListCustomRenderComponent,
        AddMemberComponent,
        PartnerListModalComponent,
        PartnerListCustomRenderComponent,
        AddPartnerComponent,
    ],
    imports: [
        CommonModule,
        MemberManageRoutingModule,
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
        MemberListModalComponent,
        MemberListCustomRenderComponent,
        AddMemberComponent,
        PartnerListModalComponent,
        PartnerListCustomRenderComponent,
        AddPartnerComponent,
    ],
})
export class MemberManageModule {
}
