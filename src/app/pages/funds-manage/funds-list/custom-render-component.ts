import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FundsListModalComponent} from './funds-list-modal/funds-list-modal.component';
import {DataService} from '../../../service/dataService';

@Component({
    selector: 'ngx-funds-list-render',
    template: `
        <button class="btn btn-small btn-primary mt-md-1 btn_small" *ngIf="dataService.permissionData.FUNDS.view"
                (click)="view()">查看
        </button>
    `,
    styleUrls: ['./custom-render-component.scss'],
})
export class FundsListCustomRenderComponent implements ViewCell, OnInit {

    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    constructor(private modalService: NgbModal,
                public dataService: DataService) {
    }

    ngOnInit() {
        this.renderValue = this.value.toString().toUpperCase();
    }

    view() {
        const activeModal = this.modalService.open(FundsListModalComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '订单信息';
        activeModal.componentInstance.isEdit = true;
        activeModal.componentInstance.data = this.rowData;
        // activeModal.result.then(confirm => {
        //     if (confirm === 'success') {
        //
        //     }
        // });
    }

}