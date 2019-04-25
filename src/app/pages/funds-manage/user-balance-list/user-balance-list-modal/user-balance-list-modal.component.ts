import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SmartTableService} from '../../../../@core/data/smart-table.service';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
    selector: 'ngx-user-balance-list-modal',
    templateUrl: './user-balance-list-modal.component.html',
    styleUrls: ['./user-balance-list-modal.component.scss'],
})
export class UserBalanceListModalComponent implements OnInit {

    settings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        hideSubHeader: true,
        perPage: 5,
        columns: {
            user: {
                title: '操作人',
                type: 'string',
                editable: false,
            },
            module: {
                title: '操作模块',
                type: 'string',
                editable: false,
            },
            behavior: {
                title: '操作行为',
                type: 'string',
                editable: false,
            },
            time: {
                title: '操作时间',
                type: 'string',
                editable: false,
            },
        },
    };

    source: LocalDataSource = new LocalDataSource();

    isEdit: any = false;
    modalHeader: any = '';

    constructor(private activeModal: NgbActiveModal,
                private service: SmartTableService) {
        const data = this.service.getData();
        this.source.load(data);

    }

    closeModal() {
        this.activeModal.close();
    }

    goToEdit() {
        this.isEdit = true;
    }

    ngOnInit() {
    }

    onDeleteConfirm(e) {

    }

}
