import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {MemberListCustomRenderComponent} from './custom-render-component';
import {DataService} from '../../../service/dataService';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-member-list',
    templateUrl: './member-list.component.html',
    styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {

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
            remainMoney: {
                title: '用户余额',
                type: 'string',
            },
            dealerProfit: {
                title: '会员返佣',
                type: 'string',
            },
            recommendProfit: {
                title: '推荐返佣',
                type: 'string',
            },
            promotionProfit: {
                title: '推广返佣',
                type: 'string',
            },
            trainingProfit: {
                title: '培训费',
                type: 'string',
            },
            // inviteMemberCount: {
            //     title: '邀请会员数',
            //     type: 'string',
            // },
            // inviteUserCount: {
            //     title: '邀请粉丝数',
            //     type: 'string',
            // },
            userState: {
                title: '用户状态',
                type: 'string',
            },
            operate: {
                title: '操作',
                type: 'custom',
                renderComponent: MemberListCustomRenderComponent,
                onComponentInitFunction: (instance) => {
                    instance.save.subscribe(row => {
                        if (row === 'success') {
                            this.ngOnInit();
                        }
                    });
                },
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
            action: 'getMemberUserList',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.data = callData.list;
                    this.initData();
                }
            }
        }).catch(err => {

        });
    }

    initData() {
        this.data.forEach(item => {
            item.createTime = this.dataService.timeStamp2formDta(item.createTime);
            item.remainMoney = item.remainMoney ? this.toFixed(item.remainMoney) + '元' : 0;
            item.dealerProfit = item.dealerProfit ? this.toFixed(item.dealerProfit) + '元' : 0;
            item.recommendProfit = item.recommendProfit ? this.toFixed(item.recommendProfit) + '元' : 0;
            item.promotionProfit = item.promotionProfit ? this.toFixed(item.promotionProfit) + '元' : 0;
            item.trainingProfit = item.trainingProfit ? this.toFixed(item.trainingProfit) + '元' : 0;
        });
        this.source.load(this.data);
    }

    refresh() {
        this.ngOnInit();
    }

    toFixed(data) {
        return data.toFixed(2);
    }

    onSubmit(f: NgForm, opt) {
        const temp = f.value;
        const sendData = {};
        if (temp.createTimeLower) {
            sendData['createTimeLower'] = this.dataService.timeStamp2formDta(temp.createTimeLower._d);
        }
        if (temp.createTimeUpper) {
            sendData['createTimeUpper'] = this.dataService.timeStamp2formDta(temp.createTimeUpper._d);
        }
        if (temp.dealerProfitLower) {
            sendData['dealerProfitLower'] = temp.dealerProfitLower;
        }
        if (temp.dealerProfitUpper) {
            sendData['dealerProfitUpper'] = temp.dealerProfitUpper;
        }
        if (temp.promotionProfitLower) {
            sendData['promotionProfitLower'] = temp.promotionProfitLower;
        }
        if (temp.promotionProfitUpper) {
            sendData['promotionProfitUpper'] = temp.promotionProfitUpper;
        }
        if (temp.recommendProfitLower) {
            sendData['recommendProfitLower'] = temp.recommendProfitLower;
        }
        if (temp.recommendProfitUpper) {
            sendData['recommendProfitUpper'] = temp.recommendProfitUpper;
        }
        if (temp.remainMoneyLower) {
            sendData['remainMoneyLower'] = temp.remainMoneyLower;
        }
        if (temp.remainMoneyUpper) {
            sendData['remainMoneyUpper'] = temp.remainMoneyUpper;
        }
        if (temp.trainingProfitLower) {
            sendData['trainingProfitLower'] = temp.trainingProfitLower;
        }
        if (temp.trainingProfitUpper) {
            sendData['trainingProfitUpper'] = temp.trainingProfitUpper;
        }
        if (temp.userIdLike) {
            sendData['userIdLike'] = temp.userIdLike;
        }
        if (temp.userNameLike) {
            sendData['userNameLike'] = temp.userNameLike;
        }
        if (temp.userStateEquals) {
            sendData['userStateEquals'] = temp.userStateEquals;
        }
        if (opt === 'search') {
            if (JSON.stringify(sendData) !== '{}') {
                sendData['action'] = 'searchMemberUser';
                this.dataService.sendRequest(sendData).then(res => {
                    if (res['serviceCall']) {
                        const callData = this.dataService.getCallData(res);
                        if (callData.result === 'success') {
                            this.data = callData.list;
                            this.initData();
                        }
                    }
                }).catch(() => {
                    this.toast.error('网络错误');
                });
            } else {
                this.ngOnInit();
            }
        } else {
            sendData['action'] = 'outputMemberUser';
            this.dataService.downfile(sendData);
        }
    }


    onDeleteConfirm(e) {
    }


}
