import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableService} from '../../../@core/data/smart-table.service';
import {ReturnProcessingCustomRenderComponent} from './custom-render-component';
import {DataService} from '../../../service/dataService';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ReturnProcessingModalComponent} from './return-processing-modal/return-processing-modal.component';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'ngx-return-processing',
    templateUrl: './return-processing.component.html',
    styleUrls: ['./return-processing.component.scss'],
})
export class ReturnProcessingComponent implements OnInit {

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
                title: '退款申请时间',
                type: 'string',
                editable: false,
            },
            orderId: {
                title: '订单号',
                type: 'string',
                editable: false,
            },
            returnOrderId: {
                title: '退款单号',
                type: 'string',
                editable: false,
            },
            returnState: {
                title: '退款类型',
                type: 'string',
                editable: false,
            },
            returnStatus: {
                title: '退款退货状态',
                type: 'string',
                editable: false,
            },
            sellerStatus: {
                title: '卖家同意退款退货状态',
                type: 'string',
                editable: false,
            },
            expressStatus: {
                title: '退货物流状态',
                type: 'string',
                editable: false,
            },
            buyer: {
                title: '买家用户名',
                type: 'string',
                editable: false,
            },
            buyerPhone: {
                title: '买家手机号',
                type: 'string',
                editable: false,
            },
            seller: {
                title: '卖家用户名',
                type: 'string',
                editable: false,
            },
            returnCount: {
                title: '退款退货件数',
                type: 'string',
                editable: false,
            },
            refundMoney: {
                title: '退款金额',
                type: 'string',
                editable: false,
            },
            refundReason: {
                title: '退款理由',
                type: 'string',
                editable: false,
            },
            returnReason: {
                title: '退货理由',
                type: 'string',
                editable: false,
            },
            applyReturnTime: {
                title: '买家申请退款/退款退货时间',
                type: 'string',
                editable: false,
            },
            accessTime: {
                title: '卖家同意退款/退款退货时间',
                type: 'string',
                editable: false,
            },
            returnTime: {
                title: '订单退款时间',
                type: 'string',
                editable: false,
            },
            option: {
                title: '操作',
                type: 'custom',
                renderComponent: ReturnProcessingCustomRenderComponent,
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
            action: 'searchReturnOrder',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.data = callData.list;
                    this.data.sort(function (a, b) {
                        return b.createTime - a.createTime;
                    });
                    // this.data.forEach((item) => {
                    //     item.createTime = this.dataService.timeStamp2formDta(item.createTime);
                    //     item.applyReturnTime = this.dataService.timeStamp2formDta(item.applyReturnTime);
                    //     item.accessTime = this.dataService.timeStamp2formDta(item.accessTime);
                    //     item.returnTime = this.dataService.timeStamp2formDta(item.returnTime);
                    // });
                    // this.source.load(this.data);
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(() => {
            this.toast.error('网络错误');
        });
    }

    refresh() {
        this.ngOnInit();
    }

    onSubmit(e: NgForm) {
        const temp = e.value;
        const sendData: any = {};
        if (temp.createTimeLower) {
            sendData['createTimeLower'] = temp.createTimeLower._d.getTime();
        }
        if (temp.createTimeUpper) {
            sendData['createTimeUpper'] = temp.createTimeUpper._d.getTime();
        }
        if (temp.logisticsNumberLike) {
            sendData['logisticsNumberLike'] = temp.logisticsNumberLike;
        }
        if (temp.orderIdLike) {
            sendData['orderIdLike'] = temp.orderIdLike;
        }
        if (temp.reasonLike) {
            sendData['reasonLike'] = temp.reasonLike;
        }
        if (temp.refundMoneyLower || temp.refundMoneyLower === 0) {
            sendData['refundMoneyLower'] = temp.refundMoneyLower;
        }
        if (temp.refundMoneyUpper) {
            sendData['refundMoneyUpper'] = temp.refundMoneyUpper;
        }
        if (temp.refundNumberLike) {
            sendData['refundNumberLike'] = temp.refundNumberLike;
        }
        if (temp.sellerLike) {
            sendData['sellerLike'] = temp.sellerLike;
        }
        if (temp.buyerLike) {
            sendData['buyerLike'] = temp.buyerLike;
        }
        if (temp.goodsStatusLike) {
            sendData['goodsStatusLike'] = temp.goodsStatusLike;
        }
        if (JSON.stringify(sendData) !== '{}') {
            sendData.action = 'searchReturnOrder';
            this.dataService.sendRequest(sendData).then(res => {
                if (res['serviceCall']) {
                    const callData = this.dataService.getCallData(res);
                    if (callData.result === 'success') {
                        this.data = callData.list;
                    }
                }
            }).catch(() => {
                this.toast.error('网络错误');
            });
        } else {
            this.ngOnInit();
        }
    }

    toFixed(data) {
        return (1 * data).toFixed(2);
    }

    send(t, opt) {
        this.dataService.sendRequest({
            action: opt,
            orderId: t.orderId,
            refundNumber: t.refundNumber,
            goodsId: t.goodsId,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.toast.success('操作成功');
                    this.ngOnInit();
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(() => {
            this.toast.error('网络错误');
        });
    }

    open(t) {
        const activeModal = this.modalService.open(ReturnProcessingModalComponent, {
            size: 'sm',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal1',
        });
        activeModal.componentInstance.modalHeader = '选择退货地址';
        activeModal.componentInstance.orderData = t;
        activeModal.componentInstance.isEdit = true;
        activeModal.result.then(confirm => {
            if (confirm === 'success') {
                this.ngOnInit();
            }
        });
    }

    agreeRefund(t) {
        this.send(t, 'agreeRefund');
    }

    agreeReturnGoods(t) {
        this.open(t);
    }

    refuseReturnGoods(t) {
        this.send(t, 'refuseReturnGoods');
    }

    refuseRefund(t) {
        this.send(t, 'refuseRefund');
    }

    confirmReceive(t) {
        this.send(t, 'confirmReceive');
    }

}
