import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {SettlementListCustomRenderComponent} from './custom-render-component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../service/dataService';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-settlement-list',
    templateUrl: './settlement-list.component.html',
    styleUrls: ['./settlement-list.component.scss'],
})
export class SettlementListComponent implements OnInit {

    selectedRows: any = [];
    settings = {
        selectMode: 'multi',
        columns: {
            cycleTime: {
                title: '结算周期时间',
                type: 'string',
            },
            settleNumber: {
                title: '结算单号',
                type: 'string',
            },
            userId: {
                title: '用户ID',
                type: 'string',
            },
            settleStatus: {
                title: '结算状态',
                type: 'string',
            },
            settleFund: {
                title: '结算金额',
                type: 'string',
            },
            bank: {
                title: '银行',
                type: 'string',
            },
            bankCard: {
                title: '银行卡号',
                type: 'string',
            },
            realName: {
                title: '户名',
                type: 'string',
            },
            settleTime: {
                title: '结算时间',
                type: 'string',
            },
            operate: {
                title: '操作',
                type: 'custom',
                renderComponent: SettlementListCustomRenderComponent,
            },
        },
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        hideSubHeader: true,
        pager: {
            perPage: 1000
        },
    };
    source: LocalDataSource = new LocalDataSource();
    data: any;
    icon: any = 'flip-2';
    createTimeLower: any;
    createTimeUpper: any;

    constructor(private router: Router,
                private modalService: NgbModal,
                public dataService: DataService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'searchBuyerSettle',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res)
                if (callData.result === 'success') {
                    this.data = callData.list;
                    this.data.forEach(item => {
                        item.settleFund = item.settleFund ? item.settleFund.toFixed(2) + '元' : 0;
                        item.settleTime = item.settleTime && item.settleTime !== '0' && item.settleTime !== 'null'
                            ? this.dataService.timeStamp2formDta(item.settleTime) : '';
                        if (item.realName.length === 2) {
                            item.realNameCopy = item.realName.substring(0, 1) + '*';
                        } else if (item.realName.length > 2) {
                            item.realNameCopy =
                                item.realName.substring(0,
                                    item.realName.length - 2) + '**';
                        } else {
                            item.realNameCopy =
                                item.realName.substring(0, 1) + '**';
                        }
                        if (item.bankCard !== '') {
                            let a = item.bankCard.substring(0, 1);
                            let b = item.bankCard.substring(17, 18);
                            item.bankCard = a + '****************' + b;
                        }
                    });
                    this.source.load(this.data);
                }
            }
        }).catch(err => {
            this.toast.error('网络错误！');
        });
    }

    refresh() {
        this.ngOnInit()
    }

    onUserRowSelect(event) {
        this.selectedRows = event.selected;
        console.log(this.selectedRows);
    }

    batchSettle() {
        const settleNumberArray: any = [];
        if (this.selectedRows.length === 0) {
            this.toast.warning('请先选择条目');
            return;
        }
        this.selectedRows.forEach(item => {
            settleNumberArray.push(item.settleNumber);
        });
        this.dataService.sendRequest({
            action: 'batchSettle',
            settleNumbers: JSON.stringify(settleNumberArray),
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res)
                if (callData.result === 'success') {
                    this.toast.success('操作成功')
                    this.selectedRows = [];
                }
            }
        }).catch(err => {
            this.toast.error('网络错误！');
        })
    }

    onSubmit(e: NgForm, opt) {
        const temp = e.value;
        this.createTimeLower = temp.createTimeLower && temp.createTimeLower._d ? this.dataService.parseTime(temp.createTimeLower._d) : '';
        this.createTimeUpper = temp.createTimeUpper && temp.createTimeUpper._d ? this.dataService.parseTime(temp.createTimeUpper._d) : '';
        if (opt === 'search') {
            this.dataService.sendRequest({
                action: 'searchBuyerSettle',
                createTimeLower: this.createTimeLower,
                createTimeUpper: this.createTimeUpper,
                settleNumberLike: temp.settleNumberLike ? '%' + temp.settleNumberLike + '%' : '',
                userIdLike: temp.userIdLike ? '%' + temp.userIdLike + '%' : '',
                settleStatusEquals: temp.settleStatusEquals,
            }).then(res => {
                if (res['serviceCall']) {
                    const callData = this.dataService.getCallData(res);
                    if (callData.result === 'success') {
                        this.toast.success('搜索成功！');
                        this.data = callData.list ? callData.list : [];
                        if (this.data.length !== 0) {
                            this.data.forEach(item => {
                                item.settleFund = item.settleFund ? item.settleFund.toFixed(2) + '元' : 0;
                                item.settleTime = item.settleTime === '0' ? '' : this.dataService.timeStamp2formDta(item.settleTime);
                                if (item.realName.length === 2) {
                                    item.realNameCopy = item.realName.substring(0, 1) + '*';
                                } else if (item.realName.length > 2) {
                                    item.realNameCopy =
                                        item.realName.substring(0,
                                            item.realName.length - 2) + '**';
                                } else {
                                    item.realNameCopy =
                                        item.realName.substring(0, 1) + '**';
                                }
                                if (item.bankCard !== '') {
                                    let a = item.bankCard.substring(0, 1);
                                    let b = item.bankCard.substring(17, 18);
                                    item.bankCard = a + '****************' + b;
                                }
                            });
                        }
                        // console.log(this.data);
                        this.source.load(this.data);
                    } else {
                        this.toast.error(callData.msg);
                    }
                }
            }).catch(err => {
                this.toast.error('网络错误');
            })
        } else if (opt === 'export') {
            this.dataService.downfile({
                action: 'outputBuyerSettles',
                createTimeLower: this.createTimeLower,
                createTimeUpper: this.createTimeUpper,
                settleNumberLike: temp.settleNumberLike ? '%' + temp.settleNumberLike + '%' : '',
                userIdLike: temp.userIdLike ? '%' + temp.userIdLike + '%' : '',
                settleStatusEquals: temp.settleStatusEquals,
            });
        }
    }

}
