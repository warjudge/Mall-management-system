import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {CommonModule} from '@angular/common';
import {AlertComponent} from './modal-overlays/dialog/alert/alert.component';
import {IndexComponent} from './index/index.component';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {PagesMenu} from './pages-menu';


const PAGES_COMPONENTS = [
    PagesComponent, AlertComponent,
];

@NgModule({
    imports: [
        CommonModule,
        PagesRoutingModule,
        ThemeModule,
        MiscellaneousModule,
    ],
    declarations: [
        ...PAGES_COMPONENTS,
        IndexComponent,
    ],
    entryComponents: [AlertComponent],
    providers: [PagesMenu],
})
export class PagesModule {
}
