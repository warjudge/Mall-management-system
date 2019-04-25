import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivityCommodityListModalComponent,
} from './activity-commodity-list-modal/activity-commodity-list-modal.component';
import {DataService} from '../../../service/dataService';
import {ToastrService} from 'ngx-toastr';


@Component({
    selector: 'ngx-activity-commodity-list-render',
    template: `
        <div class="btn_box_four">
            <button class="btn btn-small btn-primary mt-md-1 btn_small btn_margin"
                    *ngIf="dataService.permissionData.ACTIVITY.view" (click)="view()">
                查看
            </button>
            <button class="btn btn-small btn-primary mt-md-1 btn_small btn_margin"
                    *ngIf="dataService.permissionData.ACTIVITY.edit" (click)="edit()">
                编辑
            </button>
            <button class="btn btn-small btn-primary mt-md-1 btn_small btn_margin"
                    *ngIf="dataService.permissionData.ACTIVITY.delete" (click)="del()">删除
            </button>
        </div>
    `,
    styleUrls: ['./custom-render-component.scss'],
})
export class ActivityCommodityListCustomRenderComponent implements ViewCell, OnInit {

    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    @Output() save: EventEmitter<any> = new EventEmitter();

    constructor(private modalService: NgbModal,
                public dataService: DataService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.renderValue = this.value.toString().toUpperCase();
    }

    view() {
        const activeModal = this.modalService.open(ActivityCommodityListModalComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '查看';
        activeModal.componentInstance.rowData = this.rowData;
        activeModal.componentInstance.isEdit = false;
    }

    edit() {
        const activeModal = this.modalService.open(ActivityCommodityListModalComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '编辑';
        activeModal.componentInstance.rowData = this.rowData;
        activeModal.componentInstance.isEdit = true;
        activeModal.result.then(confirm => {
            if (confirm === 'success') {
                this.save.emit('success');
            }
        });
    }

    del() {
        this.dataService.sendRequest({
            action: 'delActivityGoods',
            activityId: this.rowData.activityId,
            activityGoodsId: this.rowData.activityGoodsId,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.toast.success('删除成功');
                    this.save.emit('success');
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(() => {
            this.toast.error('网络错误');
        });
    }


}