import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {RefundListCustomRenderComponent} from './custom-render-component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../service/dataService';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-refund-list',
    templateUrl: './refund-list.component.html',
    styleUrls: ['./refund-list.component.scss'],
})
export class RefundListComponent implements OnInit {

    settings = {
        columns: {
            createTime: {
                title: '创建时间',
                type: 'string',
            },
            userId: {
                title: '用户ID',
                type: 'string',
            },
            orderId: {
                title: '业务订单号',
                type: 'string',
            },
            type: {
                title: '类型',
                type: 'string',
            },
            payPrice: {
                title: '支付金额',
                type: 'string',
            },
            payType: {
                title: '支付渠道',
                type: 'string',
            },
            payNumber: {
                title: '支付流水号',
                type: 'string',
            },
            operate: {
                title: '操作',
                type: 'custom',
                renderComponent: RefundListCustomRenderComponent,
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

    constructor(private router: Router,
                private modalService: NgbModal,
                public dataService: DataService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'searchPayRefund',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.data = callData.list;
                    this.data.forEach(item => {
                        item.createTime = this.dataService.timeStamp2formDta(item.createTime);
                        item.payPrice = item.payPrice ? item.payPrice.toFixed(2) + '元' : 0;
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

    onSubmit(e: NgForm, opt) {
        const temp = e.value;
        this.createTimeLower = temp.createTimeLower && temp.createTimeLower._d ?
            this.dataService.parseTime(temp.createTimeLower._d) : '';
        this.createTimeUpper = temp.createTimeUpper && temp.createTimeUpper._d ?
            this.dataService.parseTime(temp.createTimeUpper._d) : '';
        if (opt === 'search') {
            this.dataService.sendRequest({
                action: 'searchPayRefund',
                createTimeLower: this.createTimeLower,
                createTimeUpper: this.createTimeUpper,
                orderIdLike: temp.orderIdLike ? '%' + temp.orderIdLike + '%' : '',
                payNumberLike: temp.payNumberLike ? '%' + temp.payNumberLike + '%' : '',
                payPriceLower: temp.payPriceLower,
                payPriceUpper: temp.payPriceUpper,
                userIdLike: temp.userIdLike ? '%' + temp.userIdLike + '%' : '',
                typeEquals: temp.typeEquals,
                payTypeEquals: temp.payTypeEquals,
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
                                item.createTime = this.dataService.timeStamp2formDta(item.createTime);
                                item.payPrice = item.payPrice ? item.payPrice.toFixed(2) + '元' : 0;
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
        } else if (opt === 'export') {
            this.dataService.downfile({
                action: 'outputPayRefunds',
                createTimeLower: this.createTimeLower,
                createTimeUpper: this.createTimeUpper,
                orderIdLike: temp.orderIdLike ? '%' + temp.orderIdLike + '%' : '',
                payNumberLike: temp.payNumberLike ? '%' + temp.payNumberLike + '%' : '',
                payPriceLower: temp.payPriceLower,
                payPriceUpper: temp.payPriceUpper,
                userIdLike: temp.userIdLike ? '%' + temp.userIdLike + '%' : '',
                typeEquals: temp.typeEquals,
                payTypeEquals: temp.payTypeEquals,
            });
        }
    }

}
