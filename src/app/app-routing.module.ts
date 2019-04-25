import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {
    NbAuthComponent,
    NbLoginComponent,
    NbLogoutComponent,
    NbRegisterComponent,
    NbRequestPasswordComponent,
    NbResetPasswordComponent,
} from '@nebular/auth';
import {CustomLoginComponent} from './pages/auth/custom-login/custom-login.component';
import {NotFoundComponent} from './pages/miscellaneous/not-found/not-found.component';

const routes: Routes = [
    {path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule'},
    {
        path: 'login',
        // component: CustomLoginComponent,
        children: [
            // {
            //   path: 'register',
            //   component: CustomLoginComponent,
            // },
            // {
            //   path: 'login',
            //   component: NbLoginComponent,
            // },
            // {
            //   path: 'register',
            //   component: CustomLoginComponent,
            // },
            // {
            //   path: 'logout',
            //   component: NbLogoutComponent,
            // },
            // {
            //   path: 'request-password',
            //   component: NbRequestPasswordComponent,
            // },
            // {
            //   path: 'reset-password',
            //   component: NbResetPasswordComponent,
            // },
        ],
    },
    // { path: '', redirectTo: 'pages', pathMatch: 'full' },
    {path: '', component: CustomLoginComponent},


    {path: '**', component: NotFoundComponent},
];

const config: ExtraOptions = {
    useHash: true,
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
