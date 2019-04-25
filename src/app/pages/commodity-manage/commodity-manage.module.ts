import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommodityManageRoutingModule} from './commodity-manage-routing.module';
import {CommodityListComponent} from './commodity-list/commodity-list.component';
import {AddCommodityComponent} from './add-commodity/add-commodity.component';
import {CommodityCategoryComponent} from './commodity-category/commodity-category.component';
import {ThemeModule} from '../../@theme/theme.module';
import {WarehouseListComponent} from './warehouse-list/warehouse-list.component';
import {SmartTableService} from '../../@core/data/smart-table.service';
import {OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OwlDateTimeModule} from 'ng-pick-datetime';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime-moment';
import {CKEditorModule} from 'ng2-ckeditor';
import {CKEditorComponent} from './add-commodity/ckeditor/ckeditor.component';

import {WarehouseListModalComponent} from './warehouse-list/warehouse-list-modal/warehouse-list-modal.component';
import {WarehouseListCustomRenderComponent} from './warehouse-list/custom-render-component';
import {AddWarehouseComponent} from './add-warehouse/add-warehouse.component';
import {NbDialogModule} from '@nebular/theme';
import {CommodityModalComponent} from './commodity-list/commodity-modal/commodity-modal.component';
import {CommodityOptComponent} from './commodity-list/commodity-opt.component';
import {TextareaAutosizeModule} from 'ngx-textarea-autosize';

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
        CommodityListComponent,
        AddCommodityComponent,
        CommodityCategoryComponent,
        WarehouseListComponent,
        CKEditorComponent,
        WarehouseListCustomRenderComponent,
        WarehouseListModalComponent,
        AddWarehouseComponent,
        CommodityModalComponent,
        CommodityOptComponent,
    ],
    imports: [
        CommonModule,
        CommodityManageRoutingModule,
        ThemeModule,
        Ng2SmartTableModule,
        OwlDateTimeModule,
        OwlMomentDateTimeModule,
        CKEditorModule,
        NbDialogModule.forChild(),
        TextareaAutosizeModule
    ], providers: [
        SmartTableService,
        {provide: OWL_DATE_TIME_LOCALE, useValue: 'zh-cn'},
        {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
    ],
    entryComponents: [
        AddCommodityComponent,
        AddWarehouseComponent,
        WarehouseListCustomRenderComponent,
        WarehouseListModalComponent,
        CommodityOptComponent,
    ],
})
export class CommodityManageModule {
}
