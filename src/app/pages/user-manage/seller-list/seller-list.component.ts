import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {SellListCustomRenderComponent} from './custom-render.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../service/dataService';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'ngx-seller-list',
    templateUrl: './seller-list.component.html',
    styleUrls: ['./seller-list.component.scss'],
})
export class SellerListComponent implements OnInit {

    settings = {
        columns: {
            createTime: {
                title: '用户创建时间',
                type: 'string',
            },
            userId: {
                title: '用户id',
                type: 'string',
            },
            userName: {
                title: '用户名',
                type: 'string',
            },
            phone: {
                title: '绑定手机号',
                type: 'string',
            },
            weChatNum: {
                title: '绑定微信号',
                type: 'string',
            },
            realNameCopy: {
                title: '真实姓名',
                type: 'string',
            },
            idCardCopy: {
                title: '身份证号',
                type: 'string',
            },
            remainMoney: {
                title: '用户余额',
                type: 'string',
            },
            lastLoginTime: {
                title: '上次登录时间',
                type: 'string',
            },
            userState: {
                title: '用户状态',
                type: 'string',
            },
            operate: {
                title: '操作',
                type: 'custom',
                renderComponent: SellListCustomRenderComponent,
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
    total: any = 0;
    amount: any = 0;

    constructor(private router: Router,
                private modalService: NgbModal,
                public dataService: DataService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getSellerList',
            index: 0,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.initData(callData);
                }
            }
        }).catch(err => {
            this.toast.error('网络错误！');
        });
    }

    initData(callData) {
        this.data = callData.list;
        this.total = callData.count ? callData.count : 0;
        this.amount = callData.sum ? callData.sum : 0;
        this.data.forEach(item => {
            item.createTime = item.createTime ? this.dataService.timeStamp2formDta(item.createTime) : '';
            item.lastLoginTime = item.lastLoginTime ? this.dataService.timeStamp2formDta(item.lastLoginTime) : '';
            item.remainMoney = item.remainMoney ? (1 * item.remainMoney).toFixed(2) + '元' : 0;

            if (item && item.realName && item.idCard) {
                if (item.realName.length === 2) {
                    item.realNameCopy = item.realName.substring(0, 1) + '*';
                } else if (item.realName.length > 2) {
                    item.realNameCopy = item.realName.substring(0, item.realName.length - 2) + '**';
                } else {
                    item.realNameCopy = item.realName.substring(0, 1) + '**';
                }
                item.idCardCopy = item.idCard.substring(0, 1) + '****************' +
                    item.idCard.substring(17, 18);
            }
        });
        this.source.load(this.data);
    }

    refresh() {
        this.ngOnInit();
    }

    // onSubmit(f: NgForm, opt) {
    //     const sendData: any = {};
    //     const temp = f.value;
    //     if (temp.idCardEquals) {
    //         sendData['idCardEquals'] = temp.idCardEquals;
    //     }
    //     if (temp.phoneEquals) {
    //         sendData['phoneEquals'] = temp.phoneEquals;
    //     }
    //     if (temp.createTimeLower) {
    //         sendData['createTimeLower'] = temp.createTimeLower._d.getTime();
    //     }
    //     if (temp.createTimeUpper) {
    //         sendData['createTimeUpper'] = temp.createTimeUpper._d.getTime();
    //     }
    //     if (temp.lastLoginTimeLower) {
    //         sendData['lastLoginTimeLower'] = temp.lastLoginTimeLower._d.getTime();
    //     }
    //     if (temp.lastLoginTimeUpper) {
    //         sendData['lastLoginTimeUpper'] = temp.lastLoginTimeUpper._d.getTime();
    //     }
    //     if (temp.realNameEquals) {
    //         sendData['realNameEquals'] = temp.realNameEquals;
    //     }
    //     if (temp.remainMoneyLower) {
    //         sendData['remainMoneyLower'] = temp.remainMoneyLower;
    //     }
    //     if (temp.remainMoneyUpper) {
    //         sendData['remainMoneyUpper'] = temp.remainMoneyUpper;
    //     }
    //     if (temp.userIdEquals) {
    //         sendData['userIdEquals'] = temp.userIdEquals;
    //     }
    //     if (temp.userNameEquals) {
    //         sendData['userNameEquals'] = temp.userNameEquals;
    //     }
    //     if (temp.userStateEquals) {
    //         sendData['userStateEquals'] = temp.userStateEquals;
    //     }
    //     if (temp.weChatNumEquals) {
    //         sendData['weChatNumEquals'] = temp.weChatNumEquals;
    //     }
    //     if (opt === 'search') {
    //         if (JSON.stringify(sendData) !== '{}') {
    //             sendData.action = 'searchSeller';
    //             this.dataService.sendRequest(sendData).then(res => {
    //                 if (res['serviceCall']) {
    //                     const callData = this.dataService.getCallData(res);
    //                     if (callData.result === 'success') {
    //                         this.initData(callData);
    //                     }
    //                 }
    //             }).catch(() => {
    //                 this.toast.danger('网络错误');
    //             });
    //         } else {
    //             this.ngOnInit();
    //         }
    //     } else {
    //         sendData.action = 'outputSeller';
    //         this.dataService.downfile(sendData);
    //     }
    //
    // }

    onSubmit(f: NgForm, opt) {
        const sendData: any = {};
        const temp = f.value;
        if (temp.idCardEquals) {
            sendData['idCardEquals'] = temp.idCardEquals;
        }
        if (temp.phoneEquals) {
            sendData['phoneEquals'] = temp.phoneEquals;
        }
        if (temp.createTimeLower) {
            sendData['createTimeLower'] = temp.createTimeLower._d.getTime();
        }
        if (temp.createTimeUpper) {
            sendData['createTimeUpper'] = temp.createTimeUpper._d.getTime();
        }
        if (temp.lastLoginTimeLower) {
            sendData['lastLoginTimeLower'] = temp.lastLoginTimeLower._d.getTime();
        }
        if (temp.lastLoginTimeUpper) {
            sendData['lastLoginTimeUpper'] = temp.lastLoginTimeUpper._d.getTime();
        }
        if (temp.rankEquals) {
            sendData['rankEquals'] = temp.rankEquals;
        }
        if (temp.realNameEquals) {
            sendData['realNameEquals'] = temp.realNameEquals;
        }
        if (temp.remainMoneyLower) {
            sendData['remainMoneyLower'] = temp.remainMoneyLower;
        }
        if (temp.remainMoneyUpper) {
            sendData['remainMoneyUpper'] = temp.remainMoneyUpper;
        }
        if (temp.userIdEquals) {
            sendData['userIdEquals'] = temp.userIdEquals;
        }
        if (temp.userNameEquals) {
            sendData['userNameEquals'] = temp.userNameEquals;
        }
        if (temp.userStateEquals) {
            sendData['userStateEquals'] = temp.userStateEquals;
        }
        if (temp.weChatNumEquals) {
            sendData['weChatNumEquals'] = temp.weChatNumEquals;
        }
        // sendData['']
        if (opt === 'search') {
            if (JSON.stringify(sendData) !== '{}') {
                sendData.action = 'searchSeller';
                this.dataService.sendRequest(sendData).then(res => {
                    if (res['serviceCall']) {
                        const callData = this.dataService.getCallData(res);
                        if (callData.result === 'success') {
                            this.initData(callData);
                        }
                    }
                }).catch(() => {
                    this.toast.error('网络错误');
                });
            } else {
                this.ngOnInit();
            }
        } else {
            sendData.action = 'outputSeller';
            this.dataService.downfile(sendData);
        }
    }

    // addSeller() {
    //     const activeModal = this.modalService.open(AddSellerComponent, {
    //         size: 'lg',
    //         backdrop: 'static',
    //         container: 'nb-layout',
    //         windowClass: 'customModal',
    //     });
    //     activeModal.componentInstance.modalHeader = '添加商家';
    //     activeModal.result.then(confirm => {
    //         if (confirm === 'success') {
    //             this.ngOnInit();
    //         }
    //     });
    // }

}
