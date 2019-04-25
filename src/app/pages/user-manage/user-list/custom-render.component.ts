import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserListModalComponent} from './user-list-modal/user-list-modal.component';
import {DataService} from '../../../service/dataService';
import {NbDialogService} from '@nebular/theme';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-user-list-render',
    template: `
        <div class="btn_box_three">
            <button class="btn btn-small btn-primary mt-md-1 btn_small btn_margin"
                    *ngIf="dataService.permissionData.USER.view" (click)="view()">查看
            </button>
            <button class="btn btn-small btn-primary mt-md-1 btn_small btn_margin"
                    *ngIf="dataService.permissionData.USER.edit" (click)="edit()">编辑
            </button>
            <!--<button  class="btn btn-small btn-primary mt-md-1 btn_small" (click)="del()">删除</button>-->
        </div>
    `,
    styleUrls: ['./custom-render.component.scss'],
})
export class CustomRenderComponent implements ViewCell, OnInit {

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

    view() {
        const activeModal = this.modalService.open(UserListModalComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '用户信息';
        activeModal.componentInstance.isEdit = true;
        activeModal.componentInstance.data = this.rowData;
        activeModal.result.then(confirm => {
            this.save.emit(confirm);
        });
    }

    edit() {
        const activeModal = this.modalService.open(UserListModalComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '编辑用户';
        activeModal.componentInstance.isEdit = false;
        activeModal.componentInstance.data = this.rowData;
        activeModal.result.then(confirm => {
            this.save.emit(confirm);
        });
    }

    // del() {
    //     const confirm = this.dialogService.open(AlertComponent);
    //     confirm.componentRef.instance.message = '确认删除该用户？';
    //     confirm.onClose.subscribe(opt => {
    //         if (opt === 'confirm') {
    //             console.log(this.rowData);
    //             this.dataService.sendRequest({
    //                 action: 'delUser',
    //                 id: this.rowData.userId,
    //             }).then(res => {
    //                 if (res['serviceCall']) {
    //                     const callData = this.dataService.getCallData(res);
    //                     if (callData.result === 'success') {
    //                         this.toast.success('删除成功！');
    //                         // this.parentRefresh();
    //                     } else
    //                         this.toast.error(callData.msg);
    //                 }
    //             }).catch(err => {
    //                 this.toast.error('网络错误！');
    //             });
    //         }
    //     });
    // }

}
