import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {UserManageRoutingModule} from './user-manage-routing.module';
import {UserListComponent} from './user-list/user-list.component';
import {AddUserComponent} from './add-user/add-user.component';
import {SellerListComponent} from './seller-list/seller-list.component';
import {AddSellerComponent} from './add-seller/add-seller.component';
import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';

import {OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OwlDateTimeModule} from 'ng-pick-datetime';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime-moment';
import {SmartTableService} from '../../@core/data/smart-table.service';
import {MY_MOMENT_FORMATS} from '../order-manage/order-manage.module';

import {CustomRenderComponent} from './user-list/custom-render.component';
import {UserListModalComponent} from './user-list/user-list-modal/user-list-modal.component';
import {SellListCustomRenderComponent} from './seller-list/custom-render.component';
import {SellerListModalComponent} from './seller-list/seller-list-modal/seller-list-modal.component';
import {NgxAddressModule} from 'ngx-address';
import {AddressDataChinaService, AddressModule} from '../address/address.module';

// import {AddressDataChinaModule} from "ngx-address/data/china";


@NgModule({
    declarations: [
        UserListComponent,
        AddUserComponent,
        SellerListComponent,
        AddSellerComponent,
        CustomRenderComponent,
        UserListModalComponent,
        SellListCustomRenderComponent,
        SellerListModalComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        UserManageRoutingModule,
        ThemeModule,
        Ng2SmartTableModule,
        OwlDateTimeModule,
        OwlMomentDateTimeModule,
        NgxAddressModule,
        AddressModule,
    ],
    providers: [
        SmartTableService,
        {provide: OWL_DATE_TIME_LOCALE, useValue: 'zh-cn'},
        {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
        AddressDataChinaService,
    ],
    entryComponents: [
        CustomRenderComponent,
        UserListModalComponent,
        SellListCustomRenderComponent,
        SellerListModalComponent,
        AddUserComponent,
        AddSellerComponent,
    ],
})
export class UserManageModule {
}
