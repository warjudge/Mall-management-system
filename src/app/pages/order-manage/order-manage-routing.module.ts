import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderManageComponent} from './order-manage/order-manage.component';
import {OrderListComponent} from './order-list/order-list.component';
import {ReturnProcessingComponent} from './return-processing/return-processing.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'order-list',
                component: OrderListComponent,
            },
            {
                path: 'order-manage',
                component: OrderManageComponent,
            },
            {
                path: 'return-processing',
                component: ReturnProcessingComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrderManageRoutingModule {
}
