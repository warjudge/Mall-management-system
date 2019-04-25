import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OrderListModalComponent} from './order-list-modal/order-list-modal.component';
import {DataService} from '../../../service/dataService';
import {NbDialogService} from '@nebular/theme';
import {ToastrService} from 'ngx-toastr';


@Component({
    selector: 'ngx-order-list-render',
    template: `
        <div class="btn_box_three">
            <button class="btn btn-small btn-primary mt-md-1 btn_small btn_margin"
                    *ngIf="dataService.permissionData.ORDER.view" (click)="view()">查看
            </button>
            <button class="btn btn-small btn-primary mt-md-1 btn_small btn_margin"
                    *ngIf="dataService.permissionData.ORDER.edit" (click)="edit()">编辑
            </button>
            <!--<button  class="btn btn-small btn-primary mt-md-1 btn_small" (click)="buttonClick('del')">-->
            <!--删除-->
            <!--</button>-->
        </div>
    `,
    styleUrls: ['./custom-render-component.scss'],
})
export class CustomRenderComponent implements ViewCell, OnInit {

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

    edit() {
        const activeModal = this.modalService.open(OrderListModalComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '编辑订单';
        activeModal.componentInstance.isEdit = false;
        activeModal.componentInstance.data = this.rowData;
        activeModal.result.then(confirm => {
            if (confirm === 'success') {

            }
        });
    }

    view() {
        const activeModal = this.modalService.open(OrderListModalComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '查看订单';
        activeModal.componentInstance.isEdit = true;
        activeModal.componentInstance.data = this.rowData;
    }

}