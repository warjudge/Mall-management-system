import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableService} from '../../../@core/data/smart-table.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../service/dataService';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-user-balance-list',
    templateUrl: './user-balance-list.component.html',
    styleUrls: ['./user-balance-list.component.scss'],
})
export class UserBalanceListComponent implements OnInit {

    selectedRows: any = [];
    settings = {
        selectMode: 'multi',
        columns: {
            userId: {
                title: '用户ID',
                type: 'string',
            },
            username: {
                title: '用户名',
                type: 'string',
            },
            balance: {
                title: '用户余额',
                type: 'string',
            },
            balanceStatus: {
                title: '余额状态',
                type: 'string',
            },
            // operate: {
            //     title: '操作',
            //     type: 'custom',
            //     renderComponent: CustomRenderComponent,
            // },
        },
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        hideSubHeader: true,
        pager: {
            perPage: 10000,
            // doEmit: false,
        },
    };
    source: LocalDataSource = new LocalDataSource();
    data: any;
    icon: any = 'flip-2';

    constructor(private router: Router,
                private modalService: NgbModal,
                public dataService: DataService,
                private toast: ToastrService,
                private service: SmartTableService) {
        // const data = this.service.getData();
        // this.source.load(data);
        // this.source.setPaging({ doEmit: false });
        // this.source.setPaging(1,1000,false);
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'searchAccountBalance',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.data = callData.list;
                    this.data.forEach(item => {
                        if (item.balanceStatus === 'NORMAL') {
                            item.balanceStatus = '正常';
                        } else if (item.balanceStatus === 'FROZEN') {
                            item.balanceStatus = '冻结';
                        }
                        item.balance = item.balance ? item.balance.toFixed(2) + '元' : 0;
                    });
                    this.source.load(this.data);
                }
            }
        }).catch(err => {
            this.toast.error('网络错误！');
        });
    }

    refresh() {
        this.ngOnInit();
    }

    onUserRowSelect(event) {
        this.selectedRows = event.selected;
    }

    freezeUser() {
        const userIdArray: any = [];
        if(this.selectedRows.length === 0){
            this.toast.warning('请先选择条目');
            return;
        }
        this.selectedRows.forEach(item => {
            userIdArray.push(item.userId);
        });
        this.dataService.sendRequest({
            action: 'frozen',
            userIds: JSON.stringify(userIdArray),
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.toast.success('操作成功');
                    this.ngOnInit();
                    this.selectedRows = [];
                }
            }
        }).catch(err => {
            this.toast.error('网络错误！');
        });
    }

    unlockUser() {
        const userIdArray: any = [];
        if(this.selectedRows.length === 0){
            this.toast.warning('请先选择条目');
            return;
        }
        this.selectedRows.forEach(item => {
            userIdArray.push(item.userId);
        });
        this.dataService.sendRequest({
            action: 'unfrozen',
            userIds: JSON.stringify(userIdArray),
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.toast.success('操作成功');
                    this.ngOnInit();
                    this.selectedRows = [];
                }
            }
        }).catch(err => {
            this.toast.error('网络错误！');
        });
    }

    onSubmit(e: NgForm, opt) {
        const temp = e.value;
        if (temp.balanceLower && temp.balanceUpper) {

        } else if (!temp.balanceLower && !temp.balanceUpper) {

        } else {
            this.toast.warning('请输入完整的用户余额！');
            return;
        }
        if(opt === 'search') {
            this.dataService.sendRequest({
                action: 'searchAccountBalance',
                userIdLike: temp.userIdLike !== '' ? '%' + temp.userIdLike + '%' : '',
                usernameLike: temp.usernameLike !== '' ? '%' + temp.usernameLike + '%' : '',
                balanceLower: temp.balanceLower,
                balanceUpper: temp.balanceUpper,
                balanceStatusEquals: temp.balanceStatusEquals,
            }).then(res => {
                if (res['serviceCall']) {
                    const callData = this.dataService.getCallData(res);
                    if (callData.result === 'success') {
                        this.toast.success('搜索成功！');
                        this.data = callData.list ? callData.list : [];
                        if (this.data.length !== 0) {
                            this.data.forEach(item => {
                                if (item.balanceStatus === 'NORMAL') {
                                    item.balanceStatus = '正常';
                                } else if (item.balanceStatus === 'FROZEN') {
                                    item.balanceStatus = '冻结';
                                }
                                item.balance = item.balance ? item.balance.toFixed(2) + '元' : 0;
                            });
                        }
                        this.source.load(this.data);
                    } else {
                        this.toast.error(callData.msg);
                    }
                }
            }).catch(err => {
                this.toast.error('网络错误');
            });
        }else if(opt === 'export') {
            this.dataService.downfile({
                action: 'outputAccountBalances',
                userIdLike: temp.userIdLike !== '' ? '%' + temp.userIdLike + '%' : '',
                usernameLike: temp.usernameLike !== '' ? '%' + temp.usernameLike + '%' : '',
                balanceLower: temp.balanceLower,
                balanceUpper: temp.balanceUpper,
                balanceStatusEquals: temp.balanceStatusEquals,
            });
        }

    }

}
