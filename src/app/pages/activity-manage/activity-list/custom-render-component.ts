import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateActivityComponent} from '../create-activity/create-activity.component';
import {DataService} from '../../../service/dataService';
import {ClipboardService} from 'ngx-clipboard';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


@Component({
    selector: 'ngx-activity-list-render',
    template: `
        <div class="btn_box_four">
            <button class="btn btn-small btn-primary mt-md-1 btn_small btn_margin"
                    *ngIf="dataService.permissionData.ACTIVITY.view" (click)="view()">查看
            </button>
            <button class="btn btn-small btn-primary mt-md-1 btn_small btn_margin"
                    *ngIf="dataService.permissionData.ACTIVITY.edit" (click)="edit()">编辑
            </button>
            <button class="btn btn-small btn-primary mt-md-1 btn_small btn_margin"
                    *ngIf="dataService.permissionData.ACTIVITY.delete" (click)="del()">删除
            </button>
            <button class="btn btn-small btn-primary mt-md-1 btn_small btn_long"
                    *ngIf="dataService.permissionData.ACTIVITY.view" (click)="editLink()">编辑关联商品信息
            </button>
            <!--<button class="btn btn-small btn-primary mt-md-1 btn_small btn_long" (click)="copyUrl()">-->
                <!--复制活动链接-->
            <!--</button>-->
        </div>
    `,
    styleUrls: ['./custom-render-component.scss'],
})
export class ActivityListCustomRenderComponent implements ViewCell, OnInit {

    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    @Output() save: EventEmitter<any> = new EventEmitter();

    constructor(private modalService: NgbModal,
                public dataService: DataService,
                private toast: ToastrService,
                private clip: ClipboardService,
                private router: Router) {
    }

    ngOnInit() {
        this.renderValue = this.value.toString().toUpperCase();
    }

    view() {
        const activeModal = this.modalService.open(CreateActivityComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '活动详情';
        activeModal.componentInstance.isEdit = false;
        activeModal.componentInstance.rowData = this.rowData;
    }

    edit() {
        const activeModal = this.modalService.open(CreateActivityComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '编辑活动';
        activeModal.componentInstance.isEdit = true;
        activeModal.componentInstance.rowData = this.rowData;
        activeModal.result.then(confirm => {
            if (confirm === 'success') {
                this.save.emit('success');
            }
        });
    }

    del() {
        this.dataService.sendRequest({
            action: 'delActivity',
            activityId: this.rowData.id,
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

    copyUrl() {
        if (this.rowData.activityUrl) {
            this.clip.copyFromContent(this.rowData.activityUrl);
            this.toast.success('复制成功');
        }
    }

    editLink() {
        this.router.navigate(['/pages/activity-manage/activity-commodity-list'],
            {queryParams: {rowData: JSON.stringify(this.rowData)}});
    }


}