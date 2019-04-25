import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MessageListComponent} from "./message-list/message-list.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'message-list',
                component: MessageListComponent,
            },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MessageManageRoutingModule {
}
