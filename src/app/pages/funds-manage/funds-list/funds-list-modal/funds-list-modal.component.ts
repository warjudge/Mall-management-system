import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LocalDataSource} from 'ng2-smart-table';
import {DataService} from '../../../../service/dataService';
import {NbDialogService,} from '@nebular/theme';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-funds-list-modal',
    templateUrl: './funds-list-modal.component.html',
    styleUrls: ['./funds-list-modal.component.scss']
})
export class FundsListModalComponent implements OnInit {

    settings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        hideSubHeader: true,
        perPage: 5,
        columns: {
            goodsId: {
                title: '商品编号',
                type: 'string',
                editable: false,
            },
            orderStatus: {
                title: '订单状态',
                type: 'string',
                editable: false,
            },
            category: {
                title: '商品类目',
                type: 'string',
                editable: false,
            },
            totalPrice: {
                title: '订单总金额',
                type: 'string',
                editable: false,
            },
            supplyPrice: {
                title: '供货价',
                type: 'string',
                editable: false,
            },
            myselfProfit: {
                title: '会员返佣',
                type: 'string',
                editable: false,
            },
            inviteProfit: {
                title: '推荐返佣',
                type: 'string',
                editable: false,
            },
            linkProfit: {
                title: '推广返佣',
                type: 'string',
                editable: false,
            },
            teamProfit: {
                title: '团队返佣',
                type: 'string',
                editable: false,
            },
            trainProfit: {
                title: '培训费',
                type: 'string',
                editable: false,
            },
            platformProfit: {
                title: '平台佣金',
                type: 'string',
                editable: false,
            },
        },
    };

    source: LocalDataSource = new LocalDataSource();

    isEdit: any = false;
    modalHeader: any = false;
    data: any;
    fundsDetail: any;

    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService,
                private dialogService: NbDialogService,
                private toast: ToastrService) {

    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getOrderSettleDetail',
            orderId: this.data.orderId,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.fundsDetail = callData.data;
                    this.fundsDetail.createTime =
                        this.fundsDetail.createTime ? this.dataService.timeStamp2formDta(this.fundsDetail.createTime) : '';
                    this.fundsDetail.totalPrice =
                        this.fundsDetail.totalPrice ? this.fundsDetail.totalPrice.toFixed(2) + '元' : 0
                    switch (this.fundsDetail.orderStatus) {
                        case 'NOTPAY':
                            this.fundsDetail.orderStatus = '待支付';
                            break;
                        case 'CANCEL':
                            this.fundsDetail.orderStatus = '未支付取消';
                            break;
                        case 'FAILURE':
                            this.fundsDetail.orderStatus = '交易失败';
                            break;
                        case 'NOTSEND':
                            this.fundsDetail.orderStatus = '待发货';
                            break;
                        case 'REFUNDABLE':
                            this.fundsDetail.orderStatus = '可申请退款';
                            break;
                        case 'REFUSEREFUND':
                            this.fundsDetail.orderStatus = '可再次申请退款';
                            break;
                        case 'APPLYREFUND':
                            this.fundsDetail.orderStatus = '已申请退款';
                            break;
                        case 'AGREEREFUND':
                            this.fundsDetail.orderStatus = '已同意退款';
                            break;
                        case 'REFUNDSUCCESS':
                            this.fundsDetail.orderStatus = '退款成功';
                            break;
                        case 'REFUNDFAIL':
                            this.fundsDetail.orderStatus = '退款失败';
                            break;
                        case 'DELIVERY':
                            this.fundsDetail.orderStatus = '已发货';
                            break;
                        case 'RECEIVED':
                            this.fundsDetail.orderStatus = '买家已收货';
                            break;
                        case 'RETURNABLE':
                            this.fundsDetail.orderStatus = '可申请退货';
                            break;
                        case 'REFUSERETURN':
                            this.fundsDetail.orderStatus = '可再次申请退货';
                            break;
                        case 'APPLYRETURN':
                            this.fundsDetail.orderStatus = '已申请退货';
                            break;
                        case 'AGREERETURN':
                            this.fundsDetail.orderStatus = '已同意退货';
                            break;
                        case 'APPLYRETURNNUMBER':
                            this.fundsDetail.orderStatus = '买家已发货';
                            break;
                        case 'CONFIRMRECEIVED':
                            this.fundsDetail.orderStatus = '卖家已签收';
                            break;
                        case 'RETURNSUCCESS':
                            this.fundsDetail.orderStatus = '退货成功';
                            break;
                        case 'SUCCESSREFUNDPART':
                            this.fundsDetail.orderStatus = '交易成功部分退款';
                            break;
                        case 'SUCCESSREFUTURNART':
                            this.fundsDetail.orderStatus = '交易成功部分退货';
                            break;
                    }
                    this.fundsDetail.goodsVos.forEach(item => {
                        item.totalPrice = item.totalPrice ? this.toFixed(item.totalPrice) + '元' : 0;
                        item.supplyPrice = item.supplyPrice ? this.toFixed(item.supplyPrice) + '元' : 0;
                        item.memberProfit = item.memberProfit ? this.toFixed(item.memberProfit) + '元' : 0;
                        item.inviteProfit = item.inviteProfit ? this.toFixed(item.inviteProfit) + '元' : 0;
                        item.linkProfit = item.linkProfit ? this.toFixed(item.linkProfit) + '元' : 0;
                        item.teamProfit = item.teamProfit ? this.toFixed(item.teamProfit) + '元' : 0;
                        item.trainProfit = item.trainProfit ? this.toFixed(item.trainProfit) + '元' : 0;
                        item.platformProfit = item.platformProfit ? this.toFixed(item.platformProfit) + '元' : 0;
                    })

                    this.source.load(this.fundsDetail.goodsVos);
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(() => {
            this.toast.error('网络错误！');
        });
    }

    toFixed(data) {
        return data.toFixed(2);
    }

    closeModal() {
        this.activeModal.close();
    }

    goToEdit() {
        this.isEdit = true;
    }

}
