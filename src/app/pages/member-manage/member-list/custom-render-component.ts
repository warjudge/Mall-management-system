import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MemberListModalComponent} from './member-list-modal/member-list-modal.component';
import {DataService} from '../../../service/dataService';
import {NbDialogService} from '@nebular/theme';
import {ToastrService} from 'ngx-toastr';


@Component({
    selector: 'ngx-member-list-render',
    template: `
        <div class="btn_box_three">
            <button class="btn btn-small btn-primary mt-md-1 btn_small btn_margin"
                    *ngIf="dataService.permissionData.MEMBER.view" (click)="view()">查看
            </button>
            <button class="btn btn-small btn-primary mt-md-1 btn_small btn_margin"
                    *ngIf="dataService.permissionData.MEMBER.edit" (click)="edit()">编辑
            </button>
        </div>
    `,
    styleUrls: ['./custom-render-component.scss'],
})
export class MemberListCustomRenderComponent implements ViewCell, OnInit {

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
        const activeModal = this.modalService.open(MemberListModalComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '用户信息';
        activeModal.componentInstance.isEdit = true;
        activeModal.componentInstance.data = this.rowData;
        // activeModal.result.then(confirm => {
        //     if (confirm === 'success') {
        //
        //     }
        // });
    }

    edit() {
        const activeModal = this.modalService.open(MemberListModalComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '编辑用户';
        activeModal.componentInstance.isEdit = false;
        activeModal.componentInstance.data = this.rowData;
        activeModal.result.then(confirm => {
            if (confirm === 'success') {
                this.save.emit('success');
            }
        });
    }

}