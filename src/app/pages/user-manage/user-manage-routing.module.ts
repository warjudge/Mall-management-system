import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {SellerListComponent} from './seller-list/seller-list.component';

const routes: Routes = [
    {
        path: '',
        children: [{
            path: 'user-list',
            component: UserListComponent,
        }, {
            path: 'seller-list',
            component: SellerListComponent,
        }],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserManageRoutingModule {
}
