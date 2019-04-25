import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {MessageManageRoutingModule} from './message-manage-routing.module';
import {MessageListComponent} from './message-list/message-list.component';

import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OwlDateTimeModule} from 'ng-pick-datetime';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime-moment';

import {MessageListModalComponent} from './message-list/message-list-modal/message-list-modal.component';
import {MessageListCustomRenderComponent} from './message-list/custom-render-component';
import {SmartTableService} from '../../@core/data/smart-table.service';
import {MY_MOMENT_FORMATS} from '../order-manage/order-manage.module';
import {CreateMessageModelComponent} from './create-message-model/create-message-model.component';
import {NbDialogModule} from '@nebular/theme';


@NgModule({
    declarations: [
        MessageListComponent,
        MessageListModalComponent,
        MessageListCustomRenderComponent,
        CreateMessageModelComponent,
    ],
    imports: [
        CommonModule,
        MessageManageRoutingModule,
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
        MessageListModalComponent,
        MessageListCustomRenderComponent,
        CreateMessageModelComponent,
    ],
})
export class MessageManageModule {
}
