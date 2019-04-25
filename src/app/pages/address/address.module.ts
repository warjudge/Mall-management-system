import {NgModule} from '@angular/core';

import {AddressDataChinaService} from './data.service';

export * from './data.service';

@NgModule({
    providers: [AddressDataChinaService],
})
export class AddressModule {
}
