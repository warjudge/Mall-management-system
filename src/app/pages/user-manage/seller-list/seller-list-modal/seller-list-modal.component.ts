import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LocalDataSource} from 'ng2-smart-table';
import {DataService} from '../../../../service/dataService';
import {NbDialogService} from '@nebular/theme';
import {AddressDataChinaService} from '../../../address/data.service';
import {NgForm} from '@angular/forms';
import {ImageUpload} from '../../../../service/imageUpload';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-seller-list-modal',
    templateUrl: './seller-list-modal.component.html',
    styleUrls: ['./seller-list-modal.component.scss'],
})
export class SellerListModalComponent implements OnInit {

    bankList = [
        // {
        // bankName: '中国银行',
        // cardId: '33333',
        // }
    ];
    addressList = [
        //     {
        //     address: {
        //         id: '',
        //         type: '',
        //         options: {
        //             types: this.china.getTypes(),
        //             jumps: this.china.getJumps(),
        //             data: this.china.getData.bind(this.china)
        //         }
        //     },
        //     detail: '详细地址',
        //     mobileNumber: '收货手机号',
        //     receiver: '收货人',
        // }
    ];
    addressListForSubmit = [];

    settings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        hideSubHeader: true,
        pager: {
            perPage: 5,
        },
        columns: {
            ip: {
                title: '上次登录ip',
                type: 'string',
                editable: false,
            },
            // address: {
            //     title: '上次登录地域',
            //     type: 'string',
            //     editable: false,
            // },
            // device: {
            //     title: '上次登录设备型号',
            //     type: 'string',
            //     editable: false,
            // },
            time: {
                title: '上次登录时间',
                type: 'string',
                editable: false,
            },
        },
    };

    source: LocalDataSource = new LocalDataSource();
    isEdit: any = false;
    rowData: any;
    data: any;
    modalHeader: any = '';
    loginData: any = [];
    entrance: any = [{
        id: 'headPortraitUrl',
        showFileList: [],
    }, {
        id: 'idCardPositiveImg',
        showFileList: [],
    }, {
        id: 'idCardNegativeImg',
        showFileList: [],
    }, {
        id: 'businessLicenseImg',
        showFileList: [],
    }, {
        id: 'corporationIdCardPositiveImg',
        showFileList: [],
    }, {
        id: 'corporationIdCardNegativeImg',
        showFileList: [],
    }, {
        id: 'foodBusinessLicenseImg',
        showFileList: [],
    }];
    fileList: FileList;
    showFileList: any = [];
    imgList = [];

    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService,
                private dialogService: NbDialogService,
                private toast: ToastrService,
                private china: AddressDataChinaService,
                private imageUpload: ImageUpload) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getSellerDetail',
            id: this.rowData.userId,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.data = callData.data;
                    this.data.createTime = this.dataService.timeStamp2formDta(this.data.createTime);
                    if (this.data.realAuthData && this.data.realAuthData.realName && this.data.realAuthData.idCard) {
                        if (this.data.realAuthData.realName.length === 2) {
                            this.data.realAuthData.realNameCopy = this.data.realAuthData.realName.substring(0, 1) + '*';
                        } else if (this.data.realAuthData.realName.length > 2) {
                            this.data.realAuthData.realNameCopy =
                                this.data.realAuthData.realName.substring(0,
                                    this.data.realAuthData.realName.length - 2) + '**';
                        } else {
                            this.data.realAuthData.realNameCopy =
                                this.data.realAuthData.realName.substring(0, 1) + '**';
                        }
                        this.data.realAuthData.idCardCopy =
                            this.data.realAuthData.idCard.substring(0, 1) + '****************' +
                            this.data.realAuthData.idCard.substring(17, 18);
                    }

                    if (this.data.banks && this.data.banks.length > 0) {
                        this.data.banks.forEach(item => {
                            item.cardIdCopy = item.cardId.substring(0, 2);
                            for (let i = 0; i < ('' + item.cardId).length - 4; i++) {
                                item.cardIdCopy = item.cardIdCopy + '*';
                            }
                            item.cardIdCopy = item.cardIdCopy +
                                item.cardId.substring(item.cardId.length - 2, item.cardId.length);
                        });
                    }
                    if (this.data.userStatus === '正常') {
                        this.data.userStatus = 'NORMAL';
                    }
                    if (this.data.userStatus === '冻结资金') {
                        this.data.userStatus = 'FROZENFUNDS';
                    }
                    if (this.data.userStatus === '冻结登录') {
                        this.data.userStatus = 'FROZENLOGIN';
                    }
                    this.data.returnAddressesCopy = [];
                    this.data.returnAddresses.forEach((item) => {
                        if (item) {
                            this.data.returnAddressesCopy.push({
                                address: {
                                    id: this.china.getCode(item.province + ' ' + item.city + ' ' + item.area)[2],
                                    type: '',
                                    options: {
                                        types: this.china.getTypes(),
                                        jumps: this.china.getJumps(),
                                        data: this.china.getData.bind(this.china),
                                    },
                                },
                                detail: item.detail,
                                mobileNumber: item.mobileNumber,
                                receiver: item.receiver,
                            });
                        }
                    });
                    //    此处给银行赋值
                    this.data.loginData.time =
                        this.dataService.timeStamp2formDta(this.data.loginData.time);
                    this.loginData.push(this.data.loginData);
                    this.source.load(this.loginData);
                    // entrance: any = [{
                    //     id: 'headPortraitUrl',
                    //     showFileList: [],
                    // }, {
                    //     id: 'idCardPositiveImg',
                    //     showFileList: [],
                    // }, {
                    //     id: 'idCardNegativeImg',
                    //     showFileList: [],
                    // }, {
                    //     id: 'businessLicenseImg',
                    //     showFileList: [],
                    // }, {
                    //     id: 'corporationIdCardPositiveImg',
                    //     showFileList: [],
                    // }, {
                    //     id: 'corporationIdCardNegativeImg',
                    //     showFileList: [],
                    // }, {
                    //     id: 'foodBusinessLicenseImg',
                    //     showFileList: [],
                    // }];
                    if (this.data.headPortraitUrl) {
                        this.entrance[0].showFileList.push({
                            src: this.data.headPortraitUrl,
                            w: 0,
                            h: 0,
                            name: '',
                            url: this.data.headPortraitUrl,
                        });
                    }
                    if (this.data.idCardPositiveImgUrl) {
                        this.entrance[1].showFileList.push({
                            src: this.data.idCardPositiveImgUrl,
                            w: 0,
                            h: 0,
                            name: '',
                            url: this.data.idCardPositiveImgUrl,
                        });
                    }
                    if (this.data.idCardNegativeImgUrl) {
                        this.entrance[2].showFileList.push({
                            src: this.data.idCardNegativeImgUrl,
                            w: 0,
                            h: 0,
                            name: '',
                            url: this.data.idCardNegativeImgUrl,
                        });
                    }
                    if (this.data.businessLicenseImgUrl) {
                        this.entrance[3].showFileList.push({
                            src: this.data.businessLicenseImgUrl,
                            w: 0,
                            h: 0,
                            name: '',
                            url: this.data.businessLicenseImgUrl,
                        });
                    }
                    if (this.data.corporationIdCardPositiveImgUrl) {
                        this.entrance[4].showFileList.push({
                            src: this.data.corporationIdCardPositiveImgUrl,
                            w: 0,
                            h: 0,
                            name: '',
                            url: this.data.corporationIdCardPositiveImgUrl,
                        });
                    }
                    if (this.data.corporationIdCardNegativeImgUrl) {
                        this.entrance[5].showFileList.push({
                            src: this.data.corporationIdCardNegativeImgUrl,
                            w: 0,
                            h: 0,
                            name: '',
                            url: this.data.corporationIdCardNegativeImgUrl,
                        });
                    }
                    if (this.data.foodBusinessLicenseImgUrl) {
                        this.entrance[6].showFileList.push({
                            src: this.data.foodBusinessLicenseImgUrl,
                            w: 0,
                            h: 0,
                            name: '',
                            url: this.data.foodBusinessLicenseImgUrl,
                        });
                    }

                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(() => {
            this.toast.error('网络错误！');
        });
    }


    closeModal() {
        this.activeModal.close('cancel');
    }

    delIdCard() {
        if (this.data && this.data.realAuthData) {
            this.data.realAuthData.realName = '';
            this.data.realAuthData.idCard = '';
            this.data.realAuthData.realNameCopy = '';
            this.data.realAuthData.idCardCopy = '';
        }
    }

    bankCardChange(e, index) {
        const temp = e.target.value;
        if (temp) {
            if (temp.indexOf('*') !== -1) {
                e.target.value = '';
                this.data.banks[index].cardId = '';
                return;
            } else {
                e.target.value = temp.replace(/\D/g, '');
                this.data.banks[index].cardId = e.target.value;
            }
        }
    }

    addBank() {
        this.data.banks.push({
            bankName: '',
            cardId: '',
        });
    }

    delBank(index) {
        if (this.data.banks.length > index) {
            this.data.banks.splice(index, 1);
        }
    }

    addAddress() {
        this.data.returnAddressesCopy.push({
            address: {
                id: '',
                type: '',
                options: {
                    types: this.china.getTypes(),
                    jumps: this.china.getJumps(),
                    data: this.china.getData.bind(this.china),
                },
            },
            // area: '',
            detail: '',
            mobileNumber: '',
            receiver: '',
        });
    }

    delAddress(index) {
        if (this.data.returnAddressesCopy.length > index) {
            this.data.returnAddressesCopy.splice(index, 1);
        }
    }

    onSubmit(f: NgForm) {
        const temp = f.value;
        if (!temp.nickName) {
            this.toast.warning('请输入用户昵称');
            return;
        }
        if (!temp.userStatus) {
            this.toast.warning('请选择用户状态');
            return;
        }
        if (!temp.enterpriseName) {
            this.toast.warning('请填写企业名称');
            return;
        }
        if (!temp.enterpriseName) {
            this.toast.warning('请填写企业名称');
            return;
        }
        if (!temp.corporationName) {
            this.toast.warning('请填写法人姓名');
            return;
        } else if (!this.dataService.checkPhone(temp.telephone)) {
            this.toast.warning('请输入有效用户手机号');
            return;
        }
        for (let i = 0; i < this.data.returnAddressesCopy.length; i++) {
            const item = this.data.returnAddressesCopy[i];
            if (item) {
                if (!this.dataService.checkPhone(item.mobileNumber)) {
                    this.toast.warning('请输入有效收货人手机号');
                    return;
                }
                if (!item.address.id) {
                    this.toast.warning('请选择收货地址');
                    return;
                }
                const areaString = this.china.getString(item.address.id);
                if (areaString.split(' ').length !== 3) {
                    this.toast.warning('请选择完整的收货地址');
                    return;
                }
                if (!item.detail) {
                    this.toast.warning('请填写详细地址');
                    return;
                }
                if (!item.receiver) {
                    this.toast.warning('请填写收货人');
                    return;
                }
                this.addressListForSubmit.push({
                    province: areaString.split(' ')[0],
                    city: areaString.split(' ')[1],
                    area: areaString.split(' ')[2],
                    detail: item.detail,
                    mobileNumber: item.mobileNumber,
                    receiver: item.receiver,
                });
            }
        }
        if (this.data.banks.length > 0) {
            for (let i = 0; i < this.data.banks.length; i++) {
                if (!this.data.banks[i].bankName || !this.data.banks[i].cardId) {
                    this.toast.warning('请填写完整的银行信息');
                    return;
                }
                if (!this.dataService.checkBankcardCode(this.data.banks[i].cardId)) {
                    this.toast.warning('请填写正确的银行卡号');
                    return;
                }
            }
            this.data.banks = this.dataService.replaceAllBlank(this.data.banks);
        }
        // const ent = [];
        // this.entrance.forEach(item => {
        //     if (item.showFileList.length > 0 && item.showFileList[0].w) {
        //         ent.push(item);
        //     }
        // });
        const sendData = {
            // 结算账户还没有
            action: 'editSeller',
            id: this.data.userId,
            nickName: temp.nickName,
            headPortrait: temp.headPortrait,
            telephone: temp.telephone,
            realName: this.data.realAuthData ? this.data.realAuthData.realName : '',
            idCard: this.data.realAuthData ? this.data.realAuthData.idCard : '',
            balance: temp.balance,
            userStatus: temp.userStatus,
            addressList: JSON.stringify(this.addressListForSubmit),
            bankCardList: JSON.stringify(this.data.banks),
            enterpriseName: temp.enterpriseName,
            corporationName: temp.corporationName,
            accountNote: temp.accountNote,
            // idCardPositiveImg: JSON.stringify(this.imgList),
            // idCardNegativeImg: JSON.stringify(this.imgList1),
            // businessLicenseImg: JSON.stringify(this.imgList2),
            // corporationIdCardPositiveImg: JSON.stringify(this.imgList3),
            // corporationIdCardNegativeImg: JSON.stringify(this.imgList4),
            // foodBusinessLicenseImg: JSON.stringify(this.imgList5),
        };
        // if (ent.length > 0) {
        this.imageUpload.uploadEntrance(this.entrance, sendData).then(send => {
            this.send(send);
        }).catch(() => {
            this.toast.error('网络错误');
        });
        // } else {
        //     this.send(sendData);
        // }
    }

    send(data) {
        this.dataService.sendPostRequest(data).then(res1 => {
            if (res1['serviceCall']) {
                const callData = this.dataService.getCallData(res1);
                if (callData.result === 'success') {
                    this.toast.success('保存成功！');
                    this.activeModal.close('success');
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(err => {
            this.toast.error('网络错误，请重试！');
        });
    }


    delImg(t, ent) {
        this.entrance.forEach(item => {
            if (item.id === ent) {
                item.showFileList.splice(t.serialNumber, 1);
                for (let j = 0; j < item.showFileList.length; j++) {
                    item.showFileList[j].serialNumber = j;
                }
            }
        });
    }

    fileChange(event, ent) {
        this.entrance.forEach(item => {
            if (item.id === ent) {
                this.fileList = null;
                this.fileList = event.target.files;
                event.target.files = null;
                if (this.fileList.length > 0) {
                    this.setPreview(ent);
                }
            }
        });
    }


    setPreview(ent) {
        this.entrance.forEach(item => {
            if (item.id === ent) {
                for (let i = 0; i < this.fileList.length; i++) {
                    if (!(this.fileList[i].type === 'image/jpeg'
                        || this.fileList[i].type === 'image/png' || this.fileList[i].type === 'image/gif')) {
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

