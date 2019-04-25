import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SmartTableService} from '../../../@core/data/smart-table.service';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
    selector: 'ngx-add-member',
    templateUrl: './add-member.component.html',
    styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent implements OnInit {

    settings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        hideSubHeader: true,
        pager: {
            perPage: 5,
        },
        columns: {
            id: {
                title: '用户id',
                type: 'string',
                editable: false,
            },
            lastLoginPosition: {
                title: '推荐返佣',
                type: 'string',
                editable: false,
            },
            lastLoginDevice: {
                title: '推广返佣',
                type: 'string',
                editable: false,
            },
            lastLoginTime: {
                title: '培训费',
                type: 'string',
                editable: false,
            },
            lastLoginTime1: {
                title: '邀请成功实践',
                type: 'string',
                editable: false,
            },
        },
    };

    source1: LocalDataSource = new LocalDataSource();
    source2: LocalDataSource = new LocalDataSource();
    modalHeader: any = '';


    constructor(private activeModal: NgbActiveModal,
                private service: SmartTableService) {
        const data1 = this.service.getData();
        const data2 = this.service.getData();
        this.source1.load(data1);
        this.source2.load(data2);

    }

    closeModal() {
        this.activeModal.close();
    }

    ngOnInit() {
    }

    onDeleteConfirm(e) {
    }

}
