import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../service/dataService';
import {AddSpecialFieldComponent} from '../add-special-field/add-special-field.component';
import {ToastrService} from 'ngx-toastr';
import {AlertComponent} from '../../modal-overlays/dialog/alert/alert.component';
import {NbDialogService} from '@nebular/theme';


@Component({
    selector: 'ngx-special-offer-render',
    template: `
        <div class="btn_box_two">
            <button class="btn btn-small btn-primary mt-md-1 btn_small btn_margin"
                    *ngIf="dataService.permissionData.GOODS.view" (click)="view()">
                查看
            </button>
            <button class="btn btn-small btn-primary mt-md-1 btn_small btn_margin"
                    *ngIf="dataService.permissionData.GOODS.search" (click)="edit()">
                编辑
            </button>
            <button class="btn btn-small btn-primary mt-md-1 btn_small" *ngIf="dataService.permissionData.GOODS.delete"
                    (click)="del()">删除
            </button>
        </div>
    `,
    styleUrls: ['./custom-render-component.scss'],
})
export class SpecialOfferCustomRenderComponent implements ViewCell, OnInit {

    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    @Output() save: EventEmitter<any> = new EventEmitter();

    constructor(private modalService: NgbModal,
                public dataService: DataService,
                private toast: ToastrService,
                private dialogService: NbDialogService) {
    }

    ngOnInit() {
        this.renderValue = this.value.toString().toUpperCase();
    }

    view() {
        const activeModal = this.modalService.open(AddSpecialFieldComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '特价商品详情';
        activeModal.componentInstance.isEdit = false;
        activeModal.componentInstance.rowData = this.rowData;
    }

    edit() {
        const activeModal = this.modalService.open(AddSpecialFieldComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '编辑特价商品';
        activeModal.componentInstance.isEdit = true;
        activeModal.componentInstance.rowData = this.rowData;
        activeModal.result.then(confirm => {
            if (confirm === 'success') {
                this.save.emit('success');
            }
        });
    }

    del() {
        const confirm = this.dialogService.open(AlertComponent);
        confirm.componentRef.instance.message = '确认删除该特价商品？';
        confirm.onClose.subscribe(opt => {
            if (opt === 'confirm') {
                this.dataService.sendRequest({
                    action: 'delSpecialGoods',
                    goodsSpecialId: this.rowData.specialGoodsId,
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
                    this.toast.error('网络错误！');
                });
            }
        });
    }
}