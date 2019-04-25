import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {DialogNamePromptComponent} from '../dialog-name-prompt/dialog-name-prompt.component';

@Component({
    selector: 'ngx-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {

    message: any;

    constructor(protected ref: NbDialogRef<DialogNamePromptComponent>) {
    }


    cancel() {
        this.ref.close('cancel');
    }

    submit() {
        this.ref.close('confirm');
    }

    ngOnInit() {
    }
}
