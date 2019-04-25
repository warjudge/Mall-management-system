import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserBalanceListModalComponent} from './user-balance-list-modal/user-balance-list-modal.component';
import {DataService} from '../../../service/dataService';


@Component({
    selector: 'ngx-order-list-render',
    template: `
        <div class="btn_box_three">
            <button class="btn btn-small btn-primary mt-md-1 btn_small btn_margin"
                    *ngIf="dataService.permissionData.FUNDS.view" (click)="buttonClick('view')">查看
            </button>
            <button class="btn btn-small btn-primary mt-md-1 btn_small btn_margin"
                    *ngIf="dataService.permissionData.FUNDS.edit" (click)="buttonClick('edit')">编辑
            </button>
            <button class="btn btn-small btn-primary mt-md-1 btn_small" *ngIf="dataService.permissionData.FUNDS.delete"
                    (click)="buttonClick('del')">删除
            </button>
        </div>
    `,
    styleUrls: ['./custom-render-component.scss'],
})
export class CustomRenderComponent implements ViewCell, OnInit {

    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    constructor(private modalService: NgbModal,
                public dataService: DataService) {
    }

    ngOnInit() {
        this.renderValue = this.value.toString().toUpperCase();
    }

    buttonClick(temp) {
        switch (temp) {
            case 'view': {
                this.showStaticModal();
                break;
            }
            case 'edit': {
                break;
            }
            default: {

            }
        }
    }

    showStaticModal() {
        const activeModal = this.modalService.open(UserBalanceListModalComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = 'Static modal';
        activeModal.componentInstance.modalContent = `This is static modal, backdrop click
                                                    will not close it. Click × or confirmation button to close modal.`;
    }

}