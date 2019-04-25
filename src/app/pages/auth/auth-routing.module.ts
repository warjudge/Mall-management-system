import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomLoginComponent} from './custom-login/custom-login.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                component: CustomLoginComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {
}
