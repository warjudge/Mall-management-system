import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommodityListComponent} from './commodity-list/commodity-list.component';
import {WarehouseListComponent} from './warehouse-list/warehouse-list.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'commodity-list',
                component: CommodityListComponent,
            },
            {
                path: 'warehouse-list',
                component: WarehouseListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CommodityManageRoutingModule {
}
