import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableService} from '../../../@core/data/smart-table.service';
import {CustomRenderComponent} from './custom-render-component';
import {DataService} from '../../../service/dataService';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {OrderListModalComponent} from './order-list-modal/order-list-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'ngx-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {


    settings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        pager: {perPage: 5},
        hideSubHeader: true,
        columns: {
            createTime: {
                title: '订单创建时间',
                type: 'string',
                editable: false,
            },
            orderId: {
                title: '订单号',
                type: 'string',
                editable: false,
            },
            paymoneyNum: {
                title: '支付单号',
                type: 'string',
                editable: false,
            },
            returnId: {
                title: '退款单号',
                type: 'string',
                editable: false,
            },
            status: {
                title: '订单状态',
                type: 'string',
                editable: false,
            },
            buyer: {
                title: '买家ID',
                type: 'string',
                editable: false,
            },
            phoneNum: {
                title: '手机号',
                type: 'string',
                editable: false,
            },
            paymentMoney: {
                title: '支付金额',
                type: 'string',
                editable: false,
            },
            totalPrice: {
                title: '订单总金额',
                type: 'string',
                editable: false,
            },
            totalCommission: {
                title: '返佣总金额',
                type: 'string',
                editable: false,
            },
            logisticsId: {
                title: '物流单号',
                type: 'string',
                editable: false,
            },
            payTime: {
                title: '订单支付时间',
                type: 'string',
                editable: false,
            },
            shipTime: {
                title: '订单发货时间',
                type: 'string',
                editable: false,
            },
            finishTime: {
                title: '订单成功时间',
                type: 'string',
                editable: false,
            },
            refundTime: {
                title: '订单退款时间',
                type: 'string',
                editable: false,
            },
            locked: {
                title: '锁定状态',
                type: 'string',
                editable: false,
            },
            option: {
                title: '操作',
                type: 'custom',
                renderComponent: CustomRenderComponent,
            },
        },
    };

    source: LocalDataSource = new LocalDataSource();
    data: any;
    icon: any = 'flip-2';

    p: number = 1;
    collection: any[];

    constructor(private service: SmartTableService,
                public dataService: DataService,
                private toast: ToastrService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'searchOrderList',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.data = JSON.parse(JSON.stringify(callData.list));
                    this.data.sort(function (a, b) {
                        return b.createTime - a.createTime;
                    });
                    // this.initData();
                    this.collection = this.data;
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(() => {
            this.toast.error('网络错误');
        });
    }

    initData() {
        this.data.forEach(item => {
            item.createTime = this.dataService.timeStamp2formDta(item.createTime);
            item.payTime = this.dataService.timeStamp2formDta(item.payTime);
            item.shipTime = this.dataService.timeStamp2formDta(item.shipTime);
            item.finishTime = this.dataService.timeStamp2formDta(item.finishTime);
            item.applyReturnTime = this.dataService.timeStamp2formDta(item.applyReturnTime);
            item.accessTime = this.dataService.timeStamp2formDta(item.accessTime);
            item.refundTime = this.dataService.timeStamp2formDta(item.refundTime);
            item.paymoneyId = item.paymoneyData && item.paymoneyData.paymoneyId ?
                item.paymoneyData.paymentId : '';
            item.money = item.paymoneyData && item.paymoneyData.money ?
                item.paymoneyData.money : '';
            item.nickName = item.buyerMySetting && item.buyerMySetting.nickName ?
                item.buyerMySetting.nickName : '';
            item.telephone = item.buyerMySetting && item.buyerMySetting.telephone ?
                item.buyerMySetting.telephone : '';
            item.totalCommission = item.profits && item.profits.totalCommission ?
                item.profits.totalCommission : '';
            if (item.status === 'NOTPAY')
                item.status = '待支付';
            if (item.status === 'CANCEL')
                item.status = '已取消';
            if (item.status === 'FAILURE')
                item.status = '交易失败';
            if (item.status === 'NOTSEND')
                item.status = '待发货';
            if (item.status === 'REFUNDABLE')
                item.status = '可申请退款';
            if (item.status === 'AGAINREFUNDABLE')
                item.status = '可再次申请退款';
            if (item.status === 'APPLYREFUND')
                item.status = '已申请退款';
            if (item.status === 'AGREEREFUND')
                item.status = '已同意退款';
            if (item.status === 'DELIVERY')
                item.status = '已发货';
            if (item.status === 'RECEIVED')
                item.status = '买家已收货';
            if (item.status === 'RETURNABLE')
                item.status = '可申请退货';
            if (item.status === 'APPLYRETURN')
                item.status = '已申请退货';
            if (item.status === 'AGREERETURN')
                item.status = '已同意退货';
            if (item.status === 'APPLYRETURNNUMBER')
                item.status = '已填写退货单号';
            if (item.status === 'CONFIRMRECEIVED')
                item.status = '卖家已确认收货';
            item.locked = item.locked === 'false' ? '未锁定' : '锁定';
        });
        this.source.load(this.data);
    }

    refresh() {
        this.ngOnInit();
    }

    goToDetail(item) {
        const activeModal = this.modalService.open(OrderListModalComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });
        activeModal.componentInstance.modalHeader = '编辑订单';
        activeModal.componentInstance.isEdit = false;
        activeModal.componentInstance.data = item;
        activeModal.result.then(confirm => {
            if (confirm === 'success') {
                this.ngOnInit();
            }
        });
    }

    toFixed(data) {
        return data.toFixed(2);
    }


    onSubmit(f: NgForm, opt) {
        const temp = f.value;
        const sendData: any = {};
        if (temp.logisticsNumberLike) {
            sendData['logisticsNumberLike'] = temp.logisticsNumberLike;
        }
        if (temp.createTimeLower) {
            sendData['createTimeLower'] = temp.createTimeLower._d.getTime();
        }
        if (temp.createTimeUpper) {
            sendData['createTimeUpper'] = temp.createTimeUpper._d.getTime();
        }
        if (temp.orderIdLike) {
            sendData['orderIdLike'] = temp.orderIdLike;
        }
        if (temp.payNumberLike) {
            sendData['payNumberLike'] = temp.payNumberLike;
        }
        if (temp.buyerUserIdLike) {
            sendData['buyerUserIdLike'] = temp.buyerUserIdLike;
        }
        if (temp.sellerUserIdLike) {
            sendData['sellerUserIdLike'] = temp.sellerUserIdLike;
        }

        if (temp.statusLike) {
            sendData['statusLike'] = temp.statusLike;
            // if (temp.goodsStatusLike === '待支付')
            //     sendData['goodsStatusLike'] = 'NOTPAY';
            // if (temp.goodsStatusLike === '已取消')
            //     sendData['goodsStatusLike'] = 'CANCEL';
            // if (temp.goodsStatusLike === '交易失败')
            //     sendData['goodsStatusLike'] = 'FAILURE';
            // if (temp.goodsStatusLike === '待发货')
            //     sendData['goodsStatusLike'] = 'NOTSEND';
            // if (temp.goodsStatusLike === '可申请退款')
            //     sendData['goodsStatusLike'] = 'REFUNDABLE';
            // if (temp.goodsStatusLike === '可再次申请退款')
            //     sendData['goodsStatusLike'] = 'AGAINREFUNDABLE';
            // if (temp.goodsStatusLike === '已申请退款')
            //     sendData['goodsStatusLike'] = 'APPLYREFUND';
            // if (temp.goodsStatusLike === '已同意退款')
            //     sendData['goodsStatusLike'] = 'AGREEREFUND';
            // if (temp.goodsStatusLike === '已发货')
            //     sendData['goodsStatusLike'] = 'DELIVERY';
            // if (temp.goodsStatusLike === '买家已收货')
            //     sendData['goodsStatusLike'] = 'RECEIVED';
            // if (temp.goodsStatusLike === '可申请退货')
            //     sendData['goodsStatusLike'] = 'RETURNABLE';
            // if (temp.goodsStatusLike === '已申请退货')
            //     sendData['goodsStatusLike'] = 'APPLYRETURN';
            // if (temp.goodsStatusLike === '已同意退货')
            //     sendData['goodsStatusLike'] = 'AGREERETURN';
            // if (temp.goodsStatusLike === '已填写退货单号')
            //     sendData['goodsStatusLike'] = 'APPLYRETURNNUMBER';
            // if (temp.goodsStatusLike === '卖家已确认收货')
            //     sendData['goodsStatusLike'] = 'CONFIRMRECEIVED';
        }
        if (temp.totalPriceLower || temp.totalPriceLower === 0) {
            sendData['totalPriceLower'] = temp.totalPriceLower;
        }
        if (temp.totalPriceUpper || temp.totalPriceUpper === 0) {
            sendData['totalPriceUpper'] = temp.totalPriceUpper;
        }

        if (opt === 'search') {
            if (JSON.stringify(sendData) !== '{}') {
                sendData.action = 'searchOrderList';
                this.dataService.sendRequest(sendData).then(res => {
                    if (res['serviceCall']) {
                        const callData = this.dataService.getCallData(res);
                        if (callData.result === 'success') {
                            callData.list.sort(function (a, b) {
                                return b.createTime - a.createTime;
                            });
                            this.data = callData.list;
                        }
                    }
                }).catch(() => {
                    this.toast.error('网络错误');
                });
            } else {
                this.ngOnInit();
            }
        } else {
            sendData.action = 'outputOrderDetail';
            this.dataService.downfile(sendData);
        }


    }


}
