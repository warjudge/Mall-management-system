import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddCommodityComponent} from '../add-commodity/add-commodity.component';
import {DataService} from '../../../service/dataService';
import {LocalDataSource} from 'ng2-smart-table';
import {CommodityOptComponent} from './commodity-opt.component';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-commodity-list',
    templateUrl: './commodity-list.component.html',
    styleUrls: ['./commodity-list.component.scss'],
})
export class CommodityListComponent implements OnInit {

    settings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        hideSubHeader: true,
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        columns: {
            createTime: {
                title: '商品创建时间',
                type: 'string',
                editable: false,
            },
            id: {
                title: '商品id',
                type: 'string',
                editable: false,
            },
            // goodsCode: {
            //     title: '商品条形码',
            //     type: 'string',
            //     editable: false,
            // },
            goodsCategory: {
                title: '商品类目',
                type: 'string',
                editable: false,
            },
            goodsState: {
                title: '商品状态',
                type: 'string',
                editable: false,
            },
            seller: {
                title: '卖家用户名',
                type: 'string',
                editable: false,
            },
            simpleName: {
                title: '商品标题',
                type: 'string',
                editable: false,
            },
            memberGoods: {
                title: '会员商品',
                type: 'string',
                editable: false,
            },
            skuCount: {
                title: '商品库存',
                type: 'string',
                editable: false,
            },
            costPrice: {
                title: '成本价',
                type: 'string',
                editable: false,
            },
            supplyCommodityPrice: {
                title: '供货价',
                type: 'string',
                editable: false,
            },
            retailPrice: {
                title: '零售价',
                type: 'string',
                editable: false,
            },
            freePrice: {
                title: '包邮',
                type: 'string',
                editable: false,
            },
            isRemoveGoods: {
                title: '退款退货',
                type: 'string',
                editable: false,
            },
            warehouse: {
                title: '所属仓库',
                type: 'string',
                editable: false,
            },
            opt: {
                title: '操作',
                type: 'custom',
                renderComponent: CommodityOptComponent,
                onComponentInitFunction: (instance) => {
                    instance.save.subscribe(row => {
                        if (row === 'success') {
                            this.ngOnInit();
                            // this.onSubmit(this.oldNgForm, 'search');
                        }
                    });
                },
            },

        },
    };

    data: any;
    source: LocalDataSource = new LocalDataSource();
    icon: any = 'flip-2';
    primaryCategory: any = [];
    secondaryCategory: any = [];
    count: any = '';
    oldNgForm: NgForm;

    constructor(private modalService: NgbModal,
                public dataService: DataService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getCommodityList',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.initData(callData.list);
                    this.count = callData.count ? callData.count : callData.list.length;
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(err => {
        });
        this.getCategory();
    }


    getCategory() {
        this.dataService.sendRequest({
            action: 'getCategory',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.primaryCategory = callData.list;
                }
            }
        }).catch(() => {
            this.toast.error('网络错误');
        });
    }

    refresh() {
        this.ngOnInit();
    }

    onDeleteConfirm(e) {

    }

    initData(list) {
        this.data = list;
        this.count = this.data.length;
        this.data.forEach(item => {
            // item.isRemoveGoods = item.isRemoveGoods === true ? '支持退货' : '不支持退货';
            item.createTime = this.dataService.timeStamp2formDta(item.createTime);
            item.retailPrice = item.retailPrice.toFixed(2);
            item.supplyCommodityPrice = item.supplyCommodityPrice.toFixed(2);
            item.costPrice = item.costPrice.toFixed(2);
            // item.isShow = item.isShow === true ? '上架' : '下架';
            // item.goodsAuthority = item.goodsAuthority === 1 ? '会员商品' : '非会员商品';
            // item.freePrice = item.freePrice === '-1' ? '支持包邮' : '不支持包邮';
            // if (item.warehousesList && item.warehousesList.length > 0) {
            //     let str = '';
            //     let sum = 0;
            //     item.warehousesList.forEach(w => {
            //         str = w.s + ' , ' + str;
            //         sum = sum + w.t;
            //     });
            //     item.warehouse = str;
            //     item.warehouseSum = sum;
            // }
        });
        this.source.load(this.data);
    }


    add() {
        const activeModal = this.modalService.open(AddCommodityComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });
        activeModal.componentInstance.modalHeader = '添加商品';
        activeModal.componentInstance.isEdit = true;
        activeModal.result.then(confirm => {
            if (confirm === 'success') {
                this.ngOnInit();
            }
        });
    }

    onSubmit(f: NgForm, opt) {
        const sendData: any = {};
        this.oldNgForm = f;
        const temp = f.value;
        if (temp.costPriceLower !== '') {
            sendData['costPriceLower'] = temp.costPriceLower;
        }
        if (temp.costPriceUpper !== '') {
            sendData['costPriceUpper'] = temp.costPriceUpper;
        }
        if (temp.createTimeLower) {
            sendData['createTimeLower'] = temp.createTimeLower._d.getTime();
        }
        if (temp.createTimeUpper) {
            sendData['createTimeUpper'] = temp.createTimeUpper._d.getTime();
        }
        if (temp.freePriceEquals) {
            sendData['freePriceEquals'] = temp.freePriceEquals;
        }
        if (temp.goodsCodeLike) {
            sendData['goodsCodeLike'] = '%' + temp.goodsCodeLike + '%';
        }
        if (temp.goodsNumberLike) {
            sendData['idLike'] = '%' + temp.goodsNumberLike + '%';
        }
        if (temp.goodsStateEquals) {
            sendData['goodsStateEquals'] = temp.goodsStateEquals;
        }
        if (temp.isRemoveGoodsEquals) {
            sendData['isRemoveGoodsEquals'] = temp.isRemoveGoodsEquals;
        }
        if (temp.memberGoodsEquals) {
            sendData['memberGoodsEquals'] = temp.memberGoodsEquals;
        }
        if (temp.retailPriceLower !== '') {
            sendData['retailPriceLower'] = temp.retailPriceLower;
        }
        if (temp.retailPriceUpper !== '') {
            sendData['retailPriceUpper'] = temp.retailPriceUpper;
        }
        if (temp.sellerLike) {
            sendData['sellerLike'] = '%' + temp.sellerLike + '%';
        }
        if (temp.simpleNameLike) {
            sendData['simpleNameLike'] = '%' + temp.simpleNameLike.trim() + '%';
        }
        // if (temp.skuCountLower) {
        //     // sendData['skuCountLower'] = temp.skuCountLower;
        //     sendData['skuCountLower'] = '0';
        // }
        if (temp.skuCountUpper !== '') {
            sendData['skuCountLower'] = '0';
            sendData['skuCountUpper'] = temp.skuCountUpper;
        }
        if (temp.supplyCommodityPriceLower !== '') {
            sendData['supplyCommodityPriceLower'] = temp.supplyCommodityPriceLower;
        }
        if (temp.supplyCommodityPriceUpper !== '') {
            sendData['supplyCommodityPriceUpper'] = temp.supplyCommodityPriceUpper;
        }
        if (temp.warehouseLike) {
            sendData['warehouseLike'] = '%' + temp.warehouseLike + '%';
        }
        if (temp.secondCategory || temp.primaryCategory) {
            temp.primaryCategory = temp.primaryCategory ? temp.primaryCategory : '';
            temp.secondCategory = temp.secondCategory ? temp.secondCategory : '';
            sendData['goodsCategoryLike'] = '%' + temp.primaryCategory + '/' + temp.secondCategory + '%';
            // console.log(temp.secondCategory);
            // console.log(this.secondaryCategory);
            // this.secondaryCategory.forEach(c => {
            //     if (c.categoryName === temp.secondCategory) {
            //         sendData['goodsCategoryLike'] = c.id;
            //     }
            // });
            // sendData['secondCategoryLike'] = temp.secondCategory;
        }
        if (opt === 'search') {
            if (JSON.stringify(sendData) !== '{}') {
                sendData.action = 'searchCommodity';
                this.dataService.sendRequest(sendData).then(res => {
                    if (res['serviceCall']) {
                        const callData = this.dataService.getCallData(res);
                        if (callData.result === 'success') {
                            this.initData(callData.list);
                            this.count = callData.count ? callData.count : 0;
                        }
                    }
                }).catch(() => {
                    this.toast.error('网络错误');
                });
            } else {
                this.ngOnInit();
            }
        } else {
            sendData.action = 'outputCommodity';
            this.dataService.downfile(sendData);
        }
    }


    selectCategory(e) {
        for (let i = 0; i < this.primaryCategory.length; i++) {
            if (this.primaryCategory[i].categoryName === e.target.value)
                this.secondaryCategory = this.primaryCategory[i].categorys ? this.primaryCategory[i].categorys : [];
        }
    }

}
