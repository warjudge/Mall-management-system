import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoryManageRoutingModule} from './category-manage-routing.module';
import {CategoryManageComponent} from './category-manage/category-manage.component';
import {SmartTableService} from '../../@core/data/smart-table.service';
import {OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OwlDateTimeModule} from 'ng-pick-datetime';
import {MY_MOMENT_FORMATS} from '../order-manage/order-manage.module';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime-moment';
import {ThemeModule} from '../../@theme/theme.module';
import {AddCategoryComponent} from './add-category/add-category.component';
import {NbDialogModule} from '@nebular/theme';
import {UiSwitchModule} from 'ngx-toggle-switch';


@NgModule({
    declarations: [CategoryManageComponent, AddCategoryComponent],
    imports: [
        CommonModule,
        ThemeModule,
        CategoryManageRoutingModule,
        OwlDateTimeModule,
        OwlMomentDateTimeModule,
        NbDialogModule.forChild(),
        UiSwitchModule,
    ], providers: [
        SmartTableService,
        {provide: OWL_DATE_TIME_LOCALE, useValue: 'zh-cn'},
        {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
    ], entryComponents: [
        AddCategoryComponent,
    ],
})
export class CategoryManageModule {
}
