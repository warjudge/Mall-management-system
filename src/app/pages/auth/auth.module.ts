import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {CustomLoginComponent} from './custom-login/custom-login.component';
import {ThemeModule} from '../../@theme/theme.module';

@NgModule({
    declarations: [CustomLoginComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ThemeModule,
    ],
})
export class AuthModule {
}
