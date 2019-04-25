import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SystemManageRoutingModule} from './system-manage-routing.module';
import {SystemUserListComponent} from './system-user-list/system-user-list.component';
import {FormsModule} from '@angular/forms';
import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OwlDateTimeModule} from 'ng-pick-datetime';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime-moment';
import {SmartTableService} from '../../@core/data/smart-table.service';
import {MY_MOMENT_FORMATS} from '../order-manage/order-manage.module';

import {SystemUserModalComponent} from './system-user-list/system-user-modal/system-user-modal.component';
import {SystemUserCustomRenderComponent} from './system-user-list/custom-render-component';
import {AddSystemUserComponent} from './add-system-user/add-system-user.component';
import {NbDialogModule} from '@nebular/theme';

@NgModule({
    declarations: [
        SystemUserListComponent,
        SystemUserModalComponent,
        SystemUserCustomRenderComponent,
        AddSystemUserComponent,
    ],
    imports: [
        CommonModule,
        SystemManageRoutingModule,
        FormsModule,
        ThemeModule,
        Ng2SmartTableModule,
        OwlDateTimeModule,
        OwlMomentDateTimeModule,
        NbDialogModule.forChild(),
    ],
    providers: [
        SmartTableService,
        {provide: OWL_DATE_TIME_LOCALE, useValue: 'zh-cn'},
        {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
    ],
    entryComponents: [
        SystemUserModalComponent,
        SystemUserCustomRenderComponent,
        AddSystemUserComponent,
    ],
})
export class SystemManageModule {
}
