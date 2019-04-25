import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {FundsListCustomRenderComponent} from './custom-render-component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../service/dataService';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-funds-list',
    templateUrl: './funds-list.component.html',
    styleUrls: ['./funds-list.component.scss'],
})
export class FundsListComponent implements OnInit {

    settings = {
        columns: {
            createTime: {
                title: '资金结算创建时间',
                type: 'string',
            },
            orderId: {
                title: '订单号',
                type: 'string',
            },
            userId: {
                title: '用户id',
                type: 'string',
            },
            orderStatus: {
                title: '订单状态',
                type: 'string',
            },
            totalPrice: {
                title: '订单总金额',
                type: 'string',
            },
            supplyPrice: {
                title: '供货价',
                type: 'string',
            },
            memberProfit: {
                title: '会员返佣',
                type: 'string',
            },
            inviteProfit: {
                title: '推荐返佣',
                type: 'string',
            },
            linkProfit: {
                title: '推广返佣',
                type: 'string',
            },
            teamProfit: {
                title: '团队返佣',
                type: 'string',
            },
            trainProfit: {
                title: '培训费',
                type: 'string',
            },
            platformProfit: {
                title: '平台佣金',
                type: 'string',
            },
            note: {
                title: '备注',
                type: 'string',
            },
            operate: {
                title: '操作',
                type: 'custom',
                renderComponent: FundsListCustomRenderComponent,
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
    createTimeLower: any;
    createTimeUpper: any;
    endTimeLower: any;
    endTimeUpper: any;

    constructor(private router: Router,
                private modalService: NgbModal,
                public dataService: DataService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'searchOrderSettle',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.data = callData.list;

                    this.data.forEach(item => {
                        item.createTime = this.dataService.timeStamp2formDta(item.createTime);
                        switch (item.orderStatus) {
                            case 'NOTPAY':
                                item.orderStatus = '待支付';
                                break;
                            case 'CANCEL':
                                item.orderStatus = '未支付取消';
                                break;
                            case 'FAILURE':
                                item.orderStatus = '交易失败';
                                break;
                            case 'NOTSEND':
                                item.orderStatus = '待发货';
                                break;
                            case 'REFUNDABLE':
                                item.orderStatus = '可申请退款';
                                break;
                            case 'REFUSEREFUND':
                                item.orderStatus = '可再次申请退款';
                                break;
                            case 'APPLYREFUND':
                                item.orderStatus = '已申请退款';
                                break;
                            case 'AGREEREFUND':
                                item.orderStatus = '已同意退款';
                                break;
                            case 'REFUNDSUCCESS':
                                item.orderStatus = '退款成功';
                                break;
                            case 'REFUNDFAIL':
                                item.orderStatus = '退款失败';
                                break;
                            case 'DELIVERY':
                                item.orderStatus = '已发货';
                                break;
                            case 'RECEIVED':
                                item.orderStatus = '买家已收货';
                                break;
                            case 'RETURNABLE':
                                item.orderStatus = '可申请退货';
                                break;
                            case 'REFUSERETURN':
                                item.orderStatus = '可再次申请退货';
                                break;
                            case 'APPLYRETURN':
                                item.orderStatus = '已申请退货';
                                break;
                            case 'AGREERETURN':
                                item.orderStatus = '已同意退货';
                                break;
                            case 'APPLYRETURNNUMBER':
                                item.orderStatus = '买家已发货';
                                break;
                            case 'CONFIRMRECEIVED':
                                item.orderStatus = '卖家已签收';
                                break;
                            case 'RETURNSUCCESS':
                                item.orderStatus = '退货成功';
                                break;
                            case 'SUCCESSREFUNDPART':
                                item.orderStatus = '交易成功部分退款';
                                break;
                            case 'SUCCESSREFUTURNART':
                                item.orderStatus = '交易成功部分退货';
                                break;
                        }
                        item.note = item.note === 'null' ? '' : item.note;
                        item.totalPrice = item.totalPrice ? this.toFixed(item.totalPrice) + '元' : 0;
                        item.supplyPrice = item.supplyPrice ? this.toFixed(item.supplyPrice) + '元' : 0;
                        item.memberProfit = item.memberProfit ? this.toFixed(item.memberProfit) + '元' : 0;
                        item.inviteProfit = item.inviteProfit ? this.toFixed(item.inviteProfit) + '元' : 0;
                        item.linkProfit = item.linkProfit ? this.toFixed(item.linkProfit) + '元' : 0;
                        item.teamProfit = item.teamProfit ? this.toFixed(item.teamProfit) + '元' : 0;
                        item.trainProfit = item.trainProfit ? this.toFixed(item.trainProfit) + '元' : 0;
                        item.platformProfit = item.platformProfit ? this.toFixed(item.platformProfit) + '元' : 0;
                    });
                    this.source.load(this.data);
                }
            }
        }).catch(err => {
            this.toast.error('网络错误！');
        });
    }

    toFixed(data) {
        return data.toFixed(2);
    }

    refresh() {
        this.ngOnInit();
    }

    onSubmit(e: NgForm, opt) {
        const temp = e.value;
        const sendData = {};
        if (temp.fundLower && temp.fundUpper) {

        } else if (!temp.fundLower && !temp.fundUpper) {

        } else {
            this.toast.warning('请输入完整的用户余额！');
            return;
        }
        if (temp.createTimeLower && temp.createTimeUpper) {

        } else if (!temp.createTimeLower && !temp.createTimeUpper) {

        } else {
            this.toast.warning('请输入完整的创建时间！');
            return;
        }
        // if (temp.endTimeLower && temp.endTimeUpper) {
        //
        // } else if (!temp.endTimeLower && !temp.endTimeUpper) {
        //
        // } else {
        //     this.toast.warning('请输入完整的结束时间！');
        //     return;
        // }
        if (!temp.fundTypeEquals || temp.fundTypeEquals === 'PAY' || temp.fundTypeEquals === 'EEFUND') {
            sendData['totalPriceLower'] = temp.fundLower;
            sendData['totalPriceUpper'] = temp.fundUpper;
        } else {
            switch (temp.fundTypeEquals) {
                case 'MEMBERPROFIT':
                    sendData['memberProfitLower'] = temp.fundLower;
                    sendData['memberProfitUpper'] = temp.fundUpper;
                    break;
                case 'INVITEPROFIT':
                    sendData['inviteProfitLower'] = temp.fundLower;
                    sendData['inviteProfitUpper'] = temp.fundUpper;
                    break;
                case 'LINKPROFIT':
                    sendData['linkProfitLower'] = temp.fundLower;
                    sendData['linkProfitUpper'] = temp.fundUpper;
                    break;
                case 'TEAMPROFIT':
                    sendData['teamProfitLower'] = temp.fundLower;
                    sendData['teamProfitUpper'] = temp.fundUpper;
                    break;
                case 'TRAINPROFIT':
                    sendData['trainProfitLower'] = temp.fundLower;
                    sendData['trainProfitUpper'] = temp.fundUpper;
                    break;
            }
        }
        this.createTimeLower = temp.createTimeLower && temp.createTimeLower._d ? this.dataService.parseTime(temp.createTimeLower._d) : '';
        this.createTimeUpper = temp.createTimeUpper && temp.createTimeUpper._d ? this.dataService.parseTime(temp.createTimeUpper._d) : '';
        // this.endTimeLower = temp.endTimeLower && temp.endTimeLower._d ? this.dataService.parseTime(temp.endTimeLower._d) : '';
        // this.endTimeUpper = temp.endTimeUpper && temp.endTimeUpper._d ? this.dataService.parseTime(temp.endTimeUpper._d) : '';
        sendData['action'] = 'searchOrderSettle';
        sendData['createTimeLower'] = this.createTimeLower;
        sendData['createTimeUpper'] = this.createTimeUpper;
        // sendData['endTimeLower'] = this.endTimeLower;
        // sendData['endTimeUpper'] = this.endTimeUpper;
        sendData['orderIdLike'] = temp.orderIdLike ? '%' + temp.orderIdLike + '%' : '';
        sendData['userIdLike'] = temp.userIdLike ? '%' + temp.userIdLike + '%' : '';
        sendData['usernameLike'] = temp.usernameLike ? '%' + temp.usernameLike + '%' : '';
        sendData['orderStatusEquals'] = temp.statusEquals;
        sendData['fundTypeEquals'] = temp.fundTypeEquals;
        if (opt === 'search') {
            this.dataService.sendRequest(sendData).then(res => {
                if (res['serviceCall']) {
                    const callData = this.dataService.getCallData(res);
                    if (callData.result === 'success') {
                        this.toast.success('搜索成功！');
                        this.data = callData.list ? callData.list : [];
                        if (this.data.length !== 0) {
                            this.data.forEach(item => {
                                item.createTime = this.dataService.timeStamp2formDta(item.createTime);
                                switch (item.orderStatus) {
                                    case 'NOTPAY':
                                        item.orderStatus = '待支付';
                                        break;
                                    case 'CANCEL':
                                        item.orderStatus = '未支付取消';
                                        break;
                                    case 'FAILURE':
                                        item.orderStatus = '交易失败';
                                        break;
                                    case 'NOTSEND':
                                        item.orderStatus = '待发货';
                                        break;
                                    case 'REFUNDABLE':
                                        item.orderStatus = '可申请退款';
                                        break;
                                    case 'REFUSEREFUND':
                                        item.orderStatus = '可再次申请退款';
                                        break;
                                    case 'APPLYREFUND':
                                        item.orderStatus = '已申请退款';
                                        break;
                                    case 'AGREEREFUND':
                                        item.orderStatus = '已同意退款';
                                        break;
                                    case 'REFUNDSUCCESS':
                                        item.orderStatus = '退款成功';
                                        break;
                                    case 'REFUNDFAIL':
                                        item.orderStatus = '退款失败';
                                        break;
                                    case 'DELIVERY':
                                        item.orderStatus = '已发货';
                                        break;
                                    case 'RECEIVED':
                                        item.orderStatus = '买家已收货';
                                        break;
                                    case 'RETURNABLE':
                                        item.orderStatus = '可申请退货';
                                        break;
                                    case 'REFUSERETURN':
                                        item.orderStatus = '可再次申请退货';
                                        break;
                                    case 'APPLYRETURN':
                                        item.orderStatus = '已申请退货';
                                        break;
                                    case 'AGREERETURN':
                                        item.orderStatus = '已同意退货';
                                        break;
                                    case 'APPLYRETURNNUMBER':
                                        item.orderStatus = '买家已发货';
                                        break;
                                    case 'CONFIRMRECEIVED':
                                        item.orderStatus = '卖家已签收';
                                        break;
                                    case 'RETURNSUCCESS':
                                        item.orderStatus = '退货成功';
                                        break;
                                    case 'SUCCESSREFUNDPART':
                                        item.orderStatus = '交易成功部分退款';
                                        break;
                                    case 'SUCCESSREFUTURNART':
                                        item.orderStatus = '交易成功部分退货';
                                        break;
                                }
                                item.note = item.note === 'null' ? '' : item.note;
                                item.totalPrice = item.totalPrice ? this.toFixed(item.totalPrice) + '元' : 0;
                                item.supplyPrice = item.supplyPrice ? this.toFixed(item.supplyPrice) + '元' : 0;
                                item.memberProfit = item.memberProfit ? this.toFixed(item.memberProfit) + '元' : 0;
                                item.inviteProfit = item.inviteProfit ? this.toFixed(item.inviteProfit) + '元' : 0;
                                item.linkProfit = item.linkProfit ? this.toFixed(item.linkProfit) + '元' : 0;
                                item.teamProfit = item.teamProfit ? this.toFixed(item.teamProfit) + '元' : 0;
                                item.trainProfit = item.trainProfit ? this.toFixed(item.trainProfit) + '元' : 0;
                                item.platformProfit = item.platformProfit ? this.toFixed(item.platformProfit) + '元' : 0;
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
        }else if (opt === 'export') {
            sendData['action'] = 'outputOrderSettles';
            this.dataService.downfile(sendData);
        }

    }

}
