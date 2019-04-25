import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SystemUserListComponent} from './system-user-list/system-user-list.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'system-user-list',
                component: SystemUserListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SystemManageRoutingModule {
}
