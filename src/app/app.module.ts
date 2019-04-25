/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ThemeModule} from './@theme/theme.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {DataService} from './service/dataService';
import {ImageUpload} from './service/imageUpload';
import {AuthModule} from './pages/auth/auth.module';
import {NgxAddressModule} from 'ngx-address';
import {ClipboardModule} from 'ngx-clipboard';
import {MiscellaneousModule} from './pages/miscellaneous/miscellaneous.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToasterService} from 'angular2-toaster';
import {ToastContainerModule, ToastrModule} from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        CommonModule,
        NgbModule.forRoot(),
        ThemeModule.forRoot(),
        CoreModule.forRoot(),
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        AuthModule,
        NgxAddressModule,
        ClipboardModule,
        MiscellaneousModule,
        NgxSpinnerModule,
        NgxPaginationModule,
        ToastrModule.forRoot({
            timeOut: 2000,
            positionClass: 'toast-top-center',
            preventDuplicates: false,
        }), // ToastrModule added
        ToastContainerModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/'}, DataService, ImageUpload,ToasterService,
    ],
})
export class AppModule {
}
