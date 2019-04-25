import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../service/dataService';
import {AlertComponent} from '../../modal-overlays/dialog/alert/alert.component';
import {NbDialogService} from '@nebular/theme';
import {AddCommodityComponent} from '../add-commodity/add-commodity.component';
import {ToastrService} from 'ngx-toastr';


@Component({
    selector: 'ngx-commodity-opt',
    template: `
        <div class="btn_box_four d-block">
            <button class="btn btn-small btn-primary mt-md-1 btn_small btn_margin"
                    *ngIf="dataService.permissionData.GOODS.view" (click)="view()">
                查看
            </button>
            <button class="btn btn-small btn-primary mt-md-1 btn_small btn_margin"
                    *ngIf="dataService.permissionData.GOODS.edit" (click)="edit()">
                编辑
            </button>
            <button class="btn btn-small btn-primary mt-md-1 btn_small" *ngIf="dataService.permissionData.GOODS.delete"
                    (click)="del()">删除
            </button>
        </div>
    `,
    styleUrls: ['./commodity-opt.component.scss'],
})
export class CommodityOptComponent implements ViewCell, OnInit {

    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    @Output() save: EventEmitter<any> = new EventEmitter();

    constructor(private modalService: NgbModal,
                public dataService: DataService,
                private dialogService: NbDialogService,
                private toast: ToastrService,
    ) {
    }

    ngOnInit() {
        this.renderValue = this.value.toString().toUpperCase();
    }


    edit() {
        const activeModal = this.modalService.open(AddCommodityComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '编辑商品';
        activeModal.componentInstance.isEdit = true;
        activeModal.componentInstance.rowData = this.rowData;
        activeModal.result.then(confirm => {
            if (confirm === 'success') {
                this.save.emit('success');
            }
        });

    }

    view() {
        const activeModal = this.modalService.open(AddCommodityComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '查看商品';
        activeModal.componentInstance.isEdit = false;
        activeModal.componentInstance.rowData = this.rowData;
    }

    del() {
        const confirm = this.dialogService.open(AlertComponent);
        confirm.componentRef.instance.message = '确认删除该商品？';
        confirm.onClose.subscribe(opt => {
            if (opt === 'confirm') {
                this.dataService.sendRequest({
                    action: 'delCommodity',
                    id: this.rowData.id,
                }).then(res => {
                    if (res['serviceCall']) {
                        const callData = this.dataService.getCallData(res);
                        if (callData.result === 'success') {
                            this.toast.success('删除成功！');
                            this.save.emit('success');
                        } else
                            this.toast.error(callData.msg);
                    }
                }).catch(err => {
                    this.toast.error('网络错误！');
                });
            }
        });
    }

}