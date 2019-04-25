import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RefundListModalComponent} from './refund-list-modal/refund-list-modal.component';
import {DataService} from '../../../service/dataService';
import {NbDialogService,} from '@nebular/theme';
import {ToastrService} from 'ngx-toastr';


@Component({
    selector: 'ngx-refund-list-render',
    template: `
        <button class="btn btn-small btn-primary mt-md-1 btn_small" *ngIf="dataService.permissionData.FUNDS.view"
                (click)="view()">查看
        </button>
    `,
    styleUrls: ['./custom-render-component.scss'],
})
export class RefundListCustomRenderComponent implements ViewCell, OnInit {

    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    constructor(private modalService: NgbModal,
                public dataService: DataService,
                private dialogService: NbDialogService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.renderValue = this.value.toString().toUpperCase();
    }

    view() {
        const activeModal = this.modalService.open(RefundListModalComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '详细信息';
        activeModal.componentInstance.isEdit = true;
        activeModal.componentInstance.data = this.rowData;
        // activeModal.result.then(confirm => {
        //     if (confirm === 'success') {
        //
        //     }
        // });
    }


}