import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../service/dataService';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';


@Component({
    selector: 'ngx-settlement-seller-list',
    templateUrl: './settlement-seller-list.component.html',
    styleUrls: ['./settlement-seller-list.component.scss'],
})
export class SettlementSellerListComponent implements OnInit {

    settings = {
        columns: {
            orderEndTime: {
                title: '订单成功时间',
                type: 'string',
            },
            sellerId: {
                title: '商家ID',
                type: 'string',
            },
            goodsId: {
                title: '商品ID',
                type: 'string',
            },
            account: {
                title: '购买件数',
                type: 'string',
            },
            costPrice: {
                title: '供货价',
                type: 'string',
            },
            totalPrice: {
                title: '总价',
                type: 'string',
            },
            // operate: {
            //     title: '操作',
            //     type: 'custom',
            //     renderComponent: ,
            // },
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
    orderEndTimeLower: any;
    orderEndTimeUpper: any;

    constructor(private router: Router,
                private modalService: NgbModal,
                public dataService: DataService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'searchSellerSettle',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.data = callData.list;
                    // console.log(this.data);
                    this.data.forEach(item => {
                        item.orderEndTime = this.dataService.timeStamp2formDta(item.orderEndTime);
                        item.costPrice = item.costPrice ? item.costPrice.toFixed(2)+'元' : 0;
                        item.totalPrice = item.totalPrice ? item.totalPrice.toFixed(2)+'元' : 0;
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
        this.orderEndTimeLower = temp.orderEndTimeLower && temp.orderEndTimeLower._d ?
            this.dataService.parseTime(temp.orderEndTimeLower._d) : '';
        this.orderEndTimeUpper = temp.orderEndTimeUpper && temp.orderEndTimeUpper._d ?
            this.dataService.parseTime(temp.orderEndTimeUpper._d) : '';
        if (opt === 'search') {
            this.dataService.sendRequest({
                action: 'searchSellerSettle',
                orderEndTimeLower: this.orderEndTimeLower,
                orderEndTimeUpper: this.orderEndTimeUpper,
                sellerIdLike: temp.sellerIdLike ? '%' + temp.sellerIdLike + '%' : '',
                goodsIdLike: temp.goodsIdLike ? '%' + temp.goodsIdLike + '%' : '',
            }).then(res => {
                if (res['serviceCall']) {
                    const callData = this.dataService.getCallData(res);
                    if (callData.result === 'success') {
                        this.toast.success('搜索成功！');
                        this.data = callData.list ? callData.list : [];
                        if (this.data.length !== 0) {
                            this.data.forEach(item => {
                                item.orderEndTime = this.dataService.timeStamp2formDta(item.orderEndTime);
                                item.costPrice = item.costPrice ? item.costPrice.toFixed(2)+'元' : 0;
                                item.totalPrice = item.totalPrice ? item.totalPrice.toFixed(2)+'元' : 0;
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
                action: 'outputSellerSettles',
                orderEndTimeLower: this.orderEndTimeLower,
                orderEndTimeUpper: this.orderEndTimeUpper,
                sellerIdLike: temp.sellerIdLike ? '%' + temp.sellerIdLike + '%' : '',
                goodsIdLike: temp.goodsIdLike ? '%' + temp.goodsIdLike + '%' : '',
            });
        }
    }

}
