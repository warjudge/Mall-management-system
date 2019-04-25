import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IndexManageRoutingModule} from './index-manage-routing.module';
import {AdvertisingListComponent} from './advertising-list/advertising-list.component';
import {ActivityEntranceComponent} from './activity-entrance/activity-entrance.component';
import {SpecialOfferComponent} from './special-offer/special-offer.component';
import {RecommendCommodityComponent} from './recommend-commodity/recommend-commodity.component';

import {FormsModule} from '@angular/forms';
import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE, OwlDateTimeModule} from 'ng-pick-datetime';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime-moment';
import {SmartTableService} from '../../@core/data/smart-table.service';
import {MY_MOMENT_FORMATS} from '../order-manage/order-manage.module';

import {AdvertisingListModalComponent,} from './advertising-list/advertising-list-modal/advertising-list-modal.component';
import {AdvertisingListCustomRenderComponent} from './advertising-list/custom-render-component';

import {AdListComponent} from './ad-list/ad-list.component';
import {AdListModalComponent} from './ad-list/ad-list-modal/ad-list-modal.component';
import {AdListCustomRenderComponent} from './ad-list/custom-render-component';
import {CreateAdSpaceComponent} from './create-ad-space/create-ad-space.component';
import {CreateAdComponent} from './create-ad/create-ad.component';
import {RecommendCommodityModalComponent,} from './recommend-commodity/recommend-commodity-modal/recommend-commodity-modal.component';
import {RecommendCommodityCustomRenderComponent} from './recommend-commodity/custom-render-component';
import {AddRecommendFieldComponent} from './add-recommend-field/add-recommend-field.component';
import {SpecialOfferModalComponent} from './special-offer/special-offer-modal/special-offer-modal.component';
import {SpecialOfferCustomRenderComponent} from './special-offer/custom-render-component';
import {AddSpecialFieldComponent} from './add-special-field/add-special-field.component';
import {NbDialogModule} from '@nebular/theme';


@NgModule({
    declarations: [
        AdvertisingListComponent,
        ActivityEntranceComponent,
        SpecialOfferComponent,
        RecommendCommodityComponent,
        AdvertisingListCustomRenderComponent,
        AdvertisingListModalComponent,
        AdListComponent,
        AdListCustomRenderComponent,
        AdListModalComponent,
        CreateAdSpaceComponent,
        CreateAdComponent,
        RecommendCommodityModalComponent,
        RecommendCommodityCustomRenderComponent,
        AddRecommendFieldComponent,
        SpecialOfferModalComponent,
        SpecialOfferCustomRenderComponent,
        AddSpecialFieldComponent,
    ],
    imports: [
        CommonModule,
        IndexManageRoutingModule,
        FormsModule,
        ThemeModule,
        Ng2SmartTableModule,
        OwlDateTimeModule,
        // OwlNativeDateTimeModule,
        OwlMomentDateTimeModule,
        NbDialogModule.forChild(),
    ],
    providers: [
        SmartTableService,
        {provide: OWL_DATE_TIME_LOCALE, useValue: 'zh-cn'},
        {provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS},
        // {provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS},
    ],
    entryComponents: [
        AdvertisingListCustomRenderComponent,
        AdvertisingListModalComponent,
        AdListCustomRenderComponent,
        AdListModalComponent,
        CreateAdSpaceComponent,
        CreateAdComponent,
        RecommendCommodityModalComponent,
        RecommendCommodityCustomRenderComponent,
        AddRecommendFieldComponent,
        SpecialOfferModalComponent,
        SpecialOfferCustomRenderComponent,
        AddSpecialFieldComponent,
    ],
})
export class IndexManageModule {
}
