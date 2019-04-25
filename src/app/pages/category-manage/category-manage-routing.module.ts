import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryManageComponent} from './category-manage/category-manage.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'category-manage',
                component: CategoryManageComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CategoryManageRoutingModule {
}
