import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SmartTableService} from '../../../@core/data/smart-table.service';
import {LocalDataSource} from 'ng2-smart-table';


@Component({
    selector: 'ngx-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {

    id: string;
    nickName: string;
    avatar: string;
    actualName: string;
    identityNumber: string;
    phoneNumber: string;
    wxUnionId: string;
    overage: string;
    userRole: string;
    level: string;
    status: string;
    creationTime: string;
    bankName: string;
    bankCardNumber: string;
    addressList: object = {
        id: '地址id',
        province: '省份',
        city: '市',
        district: '区域(曲村镇)',
        detail: '详细地址',
        phoneNumber: '收货手机号',
        receiver: '收货人',
    };

    settings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        hideSubHeader: true,
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        pager: {
            perPage: 5,
        },
        columns: {
            lastLoginIp: {
                title: '上次登录ip',
                type: 'string',
                editable: false,
            },
            lastLoginPosition: {
                title: '上次登录地域',
                type: 'string',
                editable: false,
            },
            lastLoginDevice: {
                title: '上次登录设备型号',
                type: 'string',
                editable: false,
            },
            lastLoginTime: {
                title: '上次登录时间',
                type: 'string',
                editable: false,
            },
        },
    };

    source: LocalDataSource = new LocalDataSource();
    modalHeader: any = '';

    constructor(private activeModal: NgbActiveModal,
                private service: SmartTableService) {
        const data = this.service.getData();
        this.source.load(data);

    }

    closeModal() {
        this.activeModal.close();
    }

    ngOnInit() {
    }

    onDeleteConfirm(e) {
    }

}
