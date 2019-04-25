import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../service/dataService';
import {NgForm} from '@angular/forms';
import {ImageUpload} from '../../../service/imageUpload';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

window['CKEDITOR_BASEPATH'] = '//cdn.ckeditor.com/4.6.1/full-all/';

@Component({
    selector: 'ngx-add-commodity',
    templateUrl: './add-commodity.component.html',
    styleUrls: ['./add-commodity.component.scss'],
})
export class AddCommodityComponent implements OnInit {


    entrance: any = [{
        id: 'bigImg',
        showFileList: [],
    }, {
        id: 'describeImg',
        showFileList: [],
    },
        // , {
        //     id: 'showGoodsImg',
        //     showFileList: [],
        // }
    ];
    fileList: FileList;
    warehouseList: any = [];
    warehouseListCopy: any = [];

    primaryCategory: any = [];
    secondaryCategory: any = [];
    skuList: number = 0;
    benefitSetting: boolean = false;
    isEdit: boolean = false;
    modalHeader: any = '';
    rowData: any;
    config: any = {
        uiColor: '#F8F8F8',   // 编辑框背景色
        language: 'zh-cn',  // 显示语言
        toolbarCanCollapse: true,  // 是否可收缩功能栏
        toolbar: [['Maximize'], ['Undo', 'Redo', '-', 'Cut', ' Copy', 'Paste', 'PasteText', 'PasteFromWord', '-',
            'Link', 'Unlink', 'Anchor', '-', 'Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', '-',
            'Source'], ['Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript', '-', 'NumberedList',
            'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote'], ['Styles', 'Format', 'Font', 'FontSize']],
    };
    editContent: string = '';
    myselfRebate: any;
    inviteRebate: any;
    linkRebate: any;
    teamRebate: any;
    myselfRebateYuan: any = 0;
    inviteRebateYuan: any = 0;
    linkRebateYuan: any = 0;
    teamRebateYuan: any = 0;
    skuSum: number = 0;
    supplyCommodityPrice: number;
    retailPrice: number;
    trainFee: number;
    costPrice: number;

    totalRebateYuan: any = 0;
    isShowTrainFee: any;

    supplyCommodityPriceForRule: any;
    retailPriceForRule: any;
    defaultUid: any = '';

    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService,
                private toast: ToastrService,
                private imageUpload: ImageUpload,
                private spinner: NgxSpinnerService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getSellerId',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.defaultUid = callData.data;
                    if (!(this.rowData && this.rowData.id))
                        this.updateWarehouseList(this.defaultUid);
                }
            }
        }).catch(() => {
        });

        this.dataService.sendRequest({
            action: 'getCategory',
        }).then(res1 => {
            if (res1['serviceCall']) {
                const callData1 = this.dataService.getCallData(res1);
                if (callData1.result === 'success') {
                    this.primaryCategory = callData1.list;
                    if (this.rowData && this.rowData.id) {
                        this.dataService.sendRequest({
                            action: 'getCommodityDetail',
                            id: this.rowData.id,
                        }).then(res => {
                            if (res['serviceCall']) {
                                const callData = this.dataService.getCallData(res);
                                if (callData.result === 'success') {
                                    this.rowData = callData.data;
                                    this.rowData.isRemoveGoods = this.rowData.isRemoveGoods === true ? '支持退货' : '不支持退货';
                                    this.rowData.createTime =
                                        this.dataService.timeStamp2formDta(this.rowData.createTime);
                                    this.rowData.isShow = this.rowData.isShow === true ? '上架' : '下架';
                                    this.trainFee = this.rowData.goodsAuthority === 1 ?
                                        this.rowData.trainFee.toFixed(2) : '';
                                    this.rowData.goodsAuthority = this.rowData.goodsAuthority === 1 ? '会员商品' : '非会员商品';
                                    this.rowData.freePrice = this.rowData.freePrice === -1 ? '支持包邮' : '不支持包邮';
                                    this.benefitSetting = this.rowData.goodsAuthority === '非会员商品';
                                    this.retailPrice = this.rowData.retailPrice.toFixed(2);
                                    this.supplyCommodityPrice = this.rowData.supplyCommodityPrice.toFixed(2);
                                    this.costPrice = this.rowData.costPrice.toFixed(2);
                                    this.myselfRebate =
                                        this.rowData.myselfRebate ? this.rowData.myselfRebate * 100 + '%' : '';
                                    this.inviteRebate =
                                        this.rowData.inviteRebate ? this.rowData.inviteRebate * 100 + '%' : '';
                                    this.linkRebate =
                                        this.rowData.linkRebate ? this.rowData.linkRebate * 100 + '%' : '';
                                    this.teamRebate =
                                        this.rowData.teamRebate ? this.rowData.teamRebate * 100 + '%' : '';
                                    this.isShowTrainFee = this.rowData.goodsAuthority === '会员商品';
                                    this.updateBenefit();
                                    if (this.rowData.categoryName) {
                                        if (this.rowData.categoryName.indexOf('/') !== -1) {
                                            const categoryArray = this.rowData.categoryName.split('/');
                                            if (categoryArray[0]) {
                                                for (let i = 0; i < this.primaryCategory.length; i++) {
                                                    if (this.primaryCategory[i].categoryName === categoryArray[0])
                                                        this.secondaryCategory = this.primaryCategory[i].categorys ?
                                                            this.primaryCategory[i].categorys : [];
                                                }
                                                this.rowData.primaryCategory = categoryArray[0];
                                            }
                                            if (categoryArray[1]) {
                                                this.rowData.secondaryCategory = categoryArray[1];
                                            }
                                        }
                                    }
                                    this.rowData.warehousesList1 = [];
                                    if (this.rowData.sellerId) {
                                        this.updateWarehouseList(this.rowData.sellerId).then(() => {
                                            this.skuList = this.rowData.warehousesList ?
                                                this.rowData.warehousesList.length : 0;
                                            setTimeout(() => {
                                                this.rowData.warehousesList1 =
                                                    JSON.parse(JSON.stringify(this.rowData.warehousesList));
                                            }, 200);
                                            if (this.rowData.warehousesList) {
                                                this.rowData.warehousesList.forEach(r => {
                                                    this.skuSum = this.skuSum + r.middle;
                                                });
                                            }
                                        });
                                    }
                                    if (this.rowData.bigImgUrl && this.rowData.bigImgUrl.length > 0) {
                                        this.entrance[0].showFileList = this.rowData.bigImgUrl;
                                        this.initImg(0);
                                    }
                                    if (this.rowData.describeImgUrl && this.rowData.describeImgUrl.length > 0) {
                                        this.entrance[1].showFileList = this.rowData.describeImgUrl;
                                        this.initImg(1);
                                    }
                                    // if (this.rowData.showGoodsImgUrl && this.rowData.showGoodsImgUrl.length > 0) {
                                    //     this.entrance[2].showFileList = this.rowData.showGoodsImgUrl;
                                    //     this.initImg(2);
                                    // }
                                }
                            }
                        }).catch(() => {
                            this.toast.error('网络错误');
                        });
                    } else {
                        this.dataService.sendRequest({
                            action: 'getCommissionSetting',
                        }).then(res => {
                            if (res['serviceCall']) {
                                const callData = this.dataService.getCallData(res);
                                if (callData.result === 'success' && callData.data !== {}) {
                                    this.myselfRebate = +callData.data.myselfRebate * 100 + '%';
                                    this.inviteRebate = +callData.data.inviteRebate * 100 + '%';
                                    this.linkRebate = +callData.data.linkRebate * 100 + '%';
                                    this.teamRebate = +callData.data.teamRebate * 100 + '%';
                                    this.trainFee = +callData.data.trainFee;
                                } else {
                                    this.toast.error(callData.msg);
                                }
                            }
                        }).catch(err => {
                            this.toast.error('网络错误！');
                        });
                    }
                } else {
                    this.toast.error(callData1.msg);
                }
            }
        }).catch(() => {
            this.toast.error('网络错误');
        });

    }

    initImg(index) {
        for (let j = 0; j < this.entrance[index].showFileList.length; j++) {
            this.entrance[index].showFileList[j].src = this.entrance[index].showFileList[j].url;
            this.entrance[index].showFileList[j].serialNumber = j;
        }
    }


    closeModal() {
        this.activeModal.close('cancel');
    }


    memberCommodityChange(e) {
        this.benefitSetting = e.target.value === '非会员商品';
        if (e.target.value === '会员商品') {
            this.isShowTrainFee = true;
        } else if (e.target.value === '非会员商品') {
            this.isShowTrainFee = false;
        }
    }

    skuChange(e) {
        let sum = 0;
        for (let i = 0; i < this.skuList; i++) {
            const warehouse0 = document.getElementById('warehouseName0' + i);
            const skuCount0 = document.getElementById('skuCount0' + i);
            // @ts-ignore
            if (warehouse0.value && skuCount0.value) {
                // @ts-ignore
                sum = sum + 1 * skuCount0.value;
            }
        }
        this.skuSum = sum;
    }

    warehouseChange(index, e) {
        const temp = [];
        for (let i = 0; i < this.skuList; i++) {
            if (index === 'warehouseName0' + i) {
                continue;
            }
            const warehouse0 = document.getElementById('warehouseName0' + i);
            if (warehouse0['value']) {
                temp.push(warehouse0['value']);
            }
        }
        if (temp.indexOf(e.target.value) !== -1) {
            e.target.value = '';
            this.toast.warning('仓库已存在');
            return;
        }
    }

    sellerChange(e) {
        if (e.target.value) {
            this.updateWarehouseList(e.target.value);
        }
    }

    tranForRule(e) {
        // console.log(e);
        if (e.target.name === 'supplyCommodityPrice') {
            this.supplyCommodityPriceForRule = e.target.value;
        }
        if (e.target.name === 'retailPrice') {
            this.retailPriceForRule = e.target.value;
        }
        if (this.supplyCommodityPriceForRule && this.retailPriceForRule) {
            if (+this.supplyCommodityPriceForRule > +this.retailPriceForRule) {
                this.toast.warning('零售价必须大于供货价！');
            } else {
                const profit = this.retailPrice - this.supplyCommodityPrice;
                if (this.myselfRebate) {
                    const myself = this.myselfRebate;
                    this.myselfRebateYuan = Math.round(profit * myself.replace('%', '') * 100) / 10000;
                }
                if (this.inviteRebate) {
                    const invite = this.inviteRebate;
                    this.inviteRebateYuan = Math.round(profit * invite.replace('%', '') * 100) / 10000;
                }
                if (this.linkRebate) {
                    const link = this.linkRebate;
                    this.linkRebateYuan = Math.round(profit * link.replace('%', '') * 100) / 10000;
                }

                if (this.teamRebate) {
                    const team = this.teamRebate;
                    this.teamRebateYuan = Math.round(profit * team.replace('%', '') * 100) / 10000;
                }
                this.totalRebateYuan = Math.round((this.myselfRebateYuan + this.inviteRebateYuan
                    + this.linkRebateYuan + this.teamRebateYuan) * 100) / 100;
                if (this.isShowTrainFee === true && this.trainFee) {
                    if (profit < +this.trainFee) {
                        this.toast.warning('利润必须大于培训费！');
                    }
                }
            }
        }
    }

    isWithRule(e) {
        if (this.supplyCommodityPriceForRule && this.retailPriceForRule) {
            const profit = this.retailPrice - this.supplyCommodityPrice;
            if (profit < +this.trainFee) {
                this.toast.warning('利润必须大于培训费！');
            }
        }
    }

    updateWarehouseList(data) {
        return new Promise(resolve => {
            this.dataService.sendRequest({
                action: 'searchWarehouseBySellerId',
                userId: data,
            }).then(res => {
                if (res['serviceCall']) {
                    const callData = this.dataService.getCallData(res);
                    if (callData.result === 'success') {
                        this.warehouseList = callData.list ? callData.list : [];
                        this.warehouseListCopy = callData.list ? callData.list : [];
                        resolve('success');
                    }
                }
            }).catch(() => {
                this.toast.error('网络错误');
            });
        });
    }


    checkNumber(e, opt) {
        let temp = e.target.value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g, '');
        temp = temp.replace(/^0{2,}/g, '0');
        temp = temp.replace(/^0(\d+)/g, '$1');
        if (1 * temp > 99999999.99) {
            temp = '99999999.99';
        }
        switch (opt) {
            case 'supplyCommodityPrice':
                this.supplyCommodityPrice =
                    temp.indexOf('.') !== -1 && temp.split('.')[1].length > 2 ? (1 * temp).toFixed(2) : temp;
                break;
            case 'retailPrice':
                this.retailPrice =
                    temp.indexOf('.') !== -1 && temp.split('.')[1].length > 2 ? (1 * temp).toFixed(2) : temp;
                break;
            case 'trainFee':
                this.trainFee =
                    temp.indexOf('.') !== -1 && temp.split('.')[1].length > 2 ? (1 * temp).toFixed(2) : temp;
                break;
            case 'costPrice':
                this.costPrice =
                    temp.indexOf('.') !== -1 && temp.split('.')[1].length > 2 ? (1 * temp).toFixed(2) : temp;
                break;
        }
        this.updateBenefit();
    }

    updateBenefit() {
        if (this.supplyCommodityPrice && this.retailPrice) {
            const profit = this.retailPrice - this.supplyCommodityPrice;
            if (this.myselfRebate)
                this.myselfRebateYuan =
                    (Math.round(profit * this.myselfRebate.replace('%', '') * 100) / 10000).toFixed(2);
            if (this.inviteRebate)
                this.inviteRebateYuan =
                    (Math.round(profit * this.inviteRebate.replace('%', '') * 100) / 10000).toFixed(2);
            if (this.linkRebate)
                this.linkRebateYuan =
                    (Math.round(profit * this.linkRebate.replace('%', '') * 100) / 10000).toFixed(2);
            if (this.teamRebate)
                this.teamRebateYuan =
                    (Math.round(profit * this.teamRebate.replace('%', '') * 100) / 10000).toFixed(2);
            this.totalRebateYuan = (Math.round((1 * this.myselfRebateYuan + 1 * this.inviteRebateYuan
                + 1 * this.linkRebateYuan + 1 * this.teamRebateYuan) * 100) / 100).toFixed(2);
        }
    }

    checkNumber1(e, opt) {
        const mid = e.target.value.replace('%', '');
        let temp = mid.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g, '');
        temp = 1 * temp > 100 ? 100 : temp;
        temp = 1 * temp < 0 ? 0 : temp;
        if (('' + temp).indexOf('.') === -1) {
            temp = 1 * temp;
        }
        switch (opt) {
            case 'myselfRebate':
                this.myselfRebate = temp + '%';
                break;
            case 'inviteRebate':
                this.inviteRebate = temp + '%';
                break;
            case 'linkRebate':
                this.linkRebate = temp + '%';
                break;
            case 'teamRebate':
                this.teamRebate = temp + '%';
                break;
        }
        if (this.supplyCommodityPrice && this.retailPrice) {
            const profit = this.retailPrice - this.supplyCommodityPrice;
            if (this.myselfRebate) {
                const myself = this.myselfRebate;
                this.myselfRebateYuan = (Math.round(profit * myself.replace('%', '') * 100) / 10000).toFixed(2);
            }
            if (this.inviteRebate) {
                const invite = this.inviteRebate;
                this.inviteRebateYuan = (Math.round(profit * invite.replace('%', '') * 100) / 10000).toFixed(2);
            }
            if (this.linkRebate) {
                const link = this.linkRebate;
                this.linkRebateYuan = (Math.round(profit * link.replace('%', '') * 100) / 10000).toFixed(2);
            }

            if (this.teamRebate) {
                const team = this.teamRebate;
                this.teamRebateYuan = (Math.round(profit * team.replace('%', '') * 100) / 10000).toFixed(2);
            }
            this.totalRebateYuan = (Math.round((1 * this.myselfRebateYuan + 1 * this.inviteRebateYuan
                + 1 * this.linkRebateYuan + 1 * this.teamRebateYuan) * 100) / 100).toFixed(2);
        }
    }

    onSubmit(e: NgForm) {
        const temp = e.value;
        if (!temp.simpleName) {
            this.toast.warning('请输入商品标题');
            if (temp.simpleName.length >= 30) {
                this.toast.warning('商品标题最多为30个字符！');
            }
            return;
        }
        if (!temp.isShow) {
            this.toast.warning('请选择商品状态');
            return;
        }
        if (!temp.shipping) {
            this.toast.warning('请选择包邮选项');
            return;
        }
        if (!temp.isRemoveGoods) {
            this.toast.warning('请选择退款退货选项');
            return;
        }
        if (!temp.memberCommodity) {
            this.toast.warning('请选择是否为会员商品');
            return;
        }
        // if (!temp.vendorId) {
        //     this.toast.warning('请输入商家用户名');
        //     return;
        // }
        if (!temp.primaryCategory) {
            this.toast.warning('请选择商品一级类目');
            return;
        }
        if (!temp.secondaryCategory) {
            this.toast.warning('请选择商品二级类目');
            return;
        }
        if (!temp.costPrice) {
            this.toast.warning('请输入商品成本价');
            return;
        }
        if (!temp.supplyCommodityPrice) {
            this.toast.warning('请输入商品供货价');
            return;
        }
        if (!temp.retailPrice) {
            this.toast.warning('请输入商品零售价');
            return;
        }
        if (!this.dataService.trimStr(temp.describeFont)) {
            this.toast.warning('请输入商品描述');
            return;
        }
        // if (!temp.fullName) {
        //     this.toast.warning('请输入商品简述');
        //     return;
        // }
        this.entrance.forEach(item => {
            if (item.showFileList.length === 0) {
                this.toast.warning('请添加商品图片');
                return;
            }
        });
        if (!this.dataService.checkNumber(temp.costPrice)) {
            this.toast.warning('请输入有效成本价');
            return;
        }
        if (!this.dataService.checkNumber(temp.supplyCommodityPrice)) {
            this.toast.warning('请输入有效供货价');
            return;
        }
        if (!this.dataService.checkNumber(temp.retailPrice)) {
            this.toast.warning('请输入有效零售价');
            return;
        }
        if (temp.memberCommodity === '非会员商品') {
            if (!temp.myselfRebate) {
                this.toast.warning('请输入会员返佣比例');
                return;
            }
            if (!temp.inviteRebate) {
                this.toast.warning('请输入推荐返佣比例');
                return;
            }
            if (!temp.linkRebate) {
                this.toast.warning('请输入推广返佣比例');
                return;
            }
            if (!temp.teamRebate) {
                this.toast.warning('请输入团队返佣比例');
                return;
            }
        } else {
            if (!temp.trainFee) {
                this.toast.warning('请输入培训费');
                return;
            }
            if (this.isShowTrainFee === true && +temp.trainFee > (+temp.retailPrice - +temp.supplyCommodityPrice)) {
                this.toast.warning('利润必须大于培训费！');
                return;
            }
        }
        if (parseFloat(temp.retailPrice) < parseFloat(temp.supplyCommodityPrice)) {
            this.toast.warning('零售价必须大于供货价！');
            return;
        }

        this.spinner.show();

        this.imageUpload.uploadEntrance(this.entrance, {}).then(sendData => {
            const sku = [];
            for (let i = 0; i < this.skuList; i++) {
                if (temp['warehouseName0' + i] && temp['skuCount0' + i])
                    this.warehouseListCopy.forEach(item => {
                        if (item.id === temp['warehouseName0' + i]) {
                            sku.push({
                                warehouseId: item.id,
                                skuCount: temp['skuCount0' + i],
                            });
                        }
                    });
            }
            let freePrice = '0';
            if (temp.shipping === '支持包邮') {
                freePrice = '-1';
            }
            let category = null;
            this.secondaryCategory.forEach(c => {
                if (c.categoryName === temp.secondaryCategory) {
                    category = c.id;
                }
            });
            sendData['costPrice'] = temp.costPrice;
            sendData['retailPrice'] = temp.retailPrice;
            sendData['fullName'] = '';
            sendData['isRemoveGoods'] = temp.isRemoveGoods === '支持退货';
            sendData['isShow'] = temp.isShow === '上架';
            sendData['categoryIds'] = category;
            sendData['vendorId'] = this.defaultUid; // temp.vendorId;
            sendData['simpleName'] = temp.simpleName;
            sendData['supplyCommodityPrice'] = temp.supplyCommodityPrice;
            sendData['goodsAuthority'] = temp.memberCommodity === '会员商品' ? 1 : 0;
            sendData['freePrice'] = freePrice;
            sendData['describeFont'] = temp.describeFont;
            if (sku.length > 0) {
                sendData['sku'] = JSON.stringify(sku);
            } else {
                this.toast.error('请添加仓库或库存！');
                this.spinner.hide();
                return;
            }
            if (temp.memberCommodity === '非会员商品') {
                const myself = temp.myselfRebate;
                const invite = temp.inviteRebate;
                const link = temp.linkRebate;
                const team = temp.teamRebate;
                sendData['myselfRebate'] = 1 * myself.replace('%', '') / 100;
                sendData['inviteRebate'] = 1 * invite.replace('%', '') / 100;
                sendData['linkRebate'] = 1 * link.replace('%', '') / 100;
                sendData['teamRebate'] = 1 * team.replace('%', '') / 100;
            } else {
                sendData['trainFee'] = 1 * temp.trainFee;
            }
            if (this.rowData) {
                sendData['id'] = this.rowData.goodsId;
                sendData['action'] = 'editCommodity';
                this.dataService.sendPostRequest(sendData).then(res2 => {
                    this.spinner.hide();
                    if (res2['serviceCall']) {
                        const callData = this.dataService.getCallData(res2);
                        if (callData.result === 'success') {
                            this.toast.success('修改成功');
                            this.activeModal.close('success');
                        } else {
                            this.toast.error(callData.msg);
                        }
                    }
                }).catch(() => {
                    this.spinner.hide();
                    this.toast.error('网络错误');
                });
            } else {
                sendData['action'] = 'addCommodity';
                this.dataService.sendPostRequest(sendData).then(res2 => {
                    this.spinner.hide();
                    if (res2['serviceCall']) {
                        const callData = this.dataService.getCallData(res2);
                        if (callData.result === 'success') {
                            this.toast.success('添加成功');
                            this.activeModal.close('success');
                        } else {
                            this.toast.error(callData.msg);
                        }
                    }
                }).catch(() => {
                    this.spinner.hide();
                    this.toast.error('网络错误');
                });
            }
        }).catch(err => {
            this.toast.error('网络错误');
        });
    }

    selectCategory(e) {
        for (let i = 0; i < this.primaryCategory.length; i++) {
            if (this.primaryCategory[i].categoryName === e.target.value)
                this.secondaryCategory = this.primaryCategory[i].categorys ? this.primaryCategory[i].categorys : [];
        }
    }

    addSku() {
        this.skuList = this.skuList + 1;
    }

    arrayOne(n: number): any[] {
        return Array(n);
    }

    delImg(t, ent, e) {
        if (e.clientX === 0) {
            return;
        }
        this.entrance.forEach(item => {
            if (item.id === ent) {
                item.showFileList.splice(t.serialNumber, 1);
                for (let j = 0; j < item.showFileList.length; j++) {
                    item.showFileList[j].serialNumber = j;
                }
            }
        });
    }


    fileChange(event, ent, max) {
        this.entrance.forEach(item => {
            if (item.id === ent) {
                if (event.target.files && max > 0 && event.target.files.length + item.showFileList.length > max) {
                    this.toast.warning('最多只能添加' + max + '张图片');
                    return;
                } else {
                    this.imageUpload.setPreview(ent, this.entrance, event.target.files).then(res => {
                        this.entrance = res;
                    });
                }
            }
        });
    }


    setPreview(ent) {
        this.entrance.forEach(item => {
            if (item.id === ent) {
                for (let i = 0; i < this.fileList.length; i++) {
                    if (!(this.fileList[i].type === 'image/jpeg' ||
                        this.fileList[i].type === 'image/png' || this.fileList[i].type === 'image/gif')) {
                        this.fileList[i] = null;
                        continue;
                    }
                    const that = this;
                    this.dataService.readBlobAsDataURL(this.fileList[i], function (dataUrl) {
                        const image = new Image();
                        const name = that.fileList[i].name;
                        image.onload = function () {
                            item.showFileList.push({src: dataUrl, w: image.width, h: image.height, name: name});
                            for (let j = 0; j < item.showFileList.length; j++) {
                                item.showFileList[j].serialNumber = j;
                            }
                        };
                        image.src = dataUrl;
                    });
                }
            }
        });
    }

}
