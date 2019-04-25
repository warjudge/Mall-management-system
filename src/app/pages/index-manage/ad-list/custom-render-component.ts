import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AdListModalComponent} from './ad-list-modal/ad-list-modal.component';
import {DataService} from '../../../service/dataService';
import {AlertComponent} from '../../modal-overlays/dialog/alert/alert.component';
import {NbDialogService} from '@nebular/theme';
import {ToastrService} from 'ngx-toastr';


@Component({
    selector: 'ngx-ad-list-render',
    template: `
        <div class="btn_box_two">
            <button class="btn btn-small btn-primary mt-md-1 btn_small btn_margin"
                    *ngIf="dataService.permissionData.AD.edit" (click)="edit()">编辑
            </button>
            <button class="btn btn-small btn-primary mt-md-1 btn_small" *ngIf="dataService.permissionData.AD.delete"
                    (click)="del()">删除
            </button>
        </div>
    `,
    styleUrls: ['./custom-render-component.scss'],
})
export class AdListCustomRenderComponent implements ViewCell, OnInit {

    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    @Output() save: EventEmitter<any> = new EventEmitter();

    constructor(private modalService: NgbModal,
                public dataService: DataService,
                private dialogService: NbDialogService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.renderValue = this.value.toString().toUpperCase();
    }

    edit() {
        const activeModal = this.modalService.open(AdListModalComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '编辑广告';
        activeModal.componentInstance.isEdit = false;
        activeModal.componentInstance.data = this.rowData;
        activeModal.result.then(confirm => {
            if (confirm === 'success') {
                this.save.emit('success');
            }
        });
    }

    del() {
        const confirm = this.dialogService.open(AlertComponent);
        confirm.componentRef.instance.message = '确认删除该广告？';
        confirm.onClose.subscribe(opt => {
            if (opt === 'confirm') {
                this.dataService.sendRequest({
                    action: 'delIndexAd',
                    advertId: this.rowData.id,
                    advertPositionId: this.rowData.advertPositionId,
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