import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
// import {SmartTableService} from '../../../@core/data/smart-table.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SystemUserCustomRenderComponent} from './custom-render-component';
import {AddSystemUserComponent} from '../add-system-user/add-system-user.component';
import {DataService} from '../../../service/dataService';
import {ToastrService} from 'ngx-toastr';


@Component({
    selector: 'ngx-system-user-list',
    templateUrl: './system-user-list.component.html',
    styleUrls: ['./system-user-list.component.scss'],
})
export class SystemUserListComponent implements OnInit {

    settings = {
        columns: {
            createTime: {
                title: '运营者创建时间',
                type: 'string',
            },
            username: {
                title: '运营者账号',
                type: 'string',
            },
            nickname: {
                title: '运营者名称',
                type: 'string',
            },
            operate: {
                title: '操作',
                type: 'custom',
                renderComponent: SystemUserCustomRenderComponent,
            },
        },
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        hideSubHeader: true,
        pager: {perPage: 5},
    };
    source: LocalDataSource = new LocalDataSource();
    data: any;
    icon: any = 'flip-2';

    constructor(private router: Router,
                private modalService: NgbModal,
                public dataService: DataService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getSystemUserList',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.data = callData.list;
                    // console.log(this.data);
                    this.data.forEach(item => {
                        if (item.createTime) {
                            item.createTime = this.dataService.timeStamp2formDta(item.createTime);
                        }
                    });
                    this.source.load(this.data);
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(err => {
            this.toast.error('网络错误！');
        });
    }

    refresh() {
        this.ngOnInit();
    }

    searchUser() {
        // this.dataService.sendRequest({
        //     action:""
        // }).then(res=>{
        // { sid:'',uid:'',serviceCall:'',callData:{}}
        // if (res.callData) {
        //   let result = this.dataService.getCallData(res)
        // }
        //
        // }).catch(err=>{
        //     console.log(err);
        // })
    }

    createSystemUser() {
        const activeModal = this.modalService.open(AddSystemUserComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });
        activeModal.componentInstance.modalHeader = '创建运营者';
        activeModal.result.then(confirm => {
            if (confirm === 'success') {
                this.ngOnInit();
            }
        });
    }

}
