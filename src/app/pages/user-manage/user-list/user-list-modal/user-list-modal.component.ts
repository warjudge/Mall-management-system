import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LocalDataSource} from 'ng2-smart-table';
import {NgForm} from '@angular/forms';
import {DataService} from '../../../../service/dataService';
import {NbDialogService} from '@nebular/theme';
import {AddressDataChinaService} from '../../../address/data.service';
import {ImageUpload} from '../../../../service/imageUpload';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-user-list-modal',
    templateUrl: './user-list-modal.component.html',
    styleUrls: ['./user-list-modal.component.scss'],
})
export class UserListModalComponent implements OnInit {

    fileList: FileList;
    addressList = [];
    addressListForSubmit = [];
    sellerOrNot: boolean = false;
    entrance: any = [{
        id: 'headPortraitUrl',
        showFileList: [],
    }];

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
    data: any;
    modalHeader: any;
    loginData: any = [];
    parentId: any = '';

    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService,
                private dialogService: NbDialogService,
                private toast: ToastrService,
                private china: AddressDataChinaService,
                private imageUpload: ImageUpload) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'findParentById',
            userId: this.data.userId,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                this.parentId = callData.data;
                console.log(callData)
                console.log(this.parentId)
            }
        }).catch(() => {
            this.toast.error('网络错误');
        });
        this.dataService.sendRequest({
            action: 'getUserDetail',
            id: this.data.userId,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.data = callData.data;
                    if (this.data.createTime)
                        this.data.createTime = this.dataService.timeStamp2formDta(this.data.createTime);
                    if (this.data.sellerOrNot) {
                        this.data.isSeller = this.data.sellerOrNot === true ? '卖家' : '买家';
                    } else {
                        this.data.isSeller = '买家';
                    }

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

                    if (this.data.bankCardList && this.data.bankCardList.length > 0) {
                        this.data.bankCardList.forEach(item => {
                            // item.cardIdCopy = item.cardId.substring(0, 2);
                            // for (let i = 0; i < ('' + item.cardId).length - 4; i++) {
                            //     item.cardIdCopy = item.cardIdCopy + '*';
                            // }
                            // item.cardIdCopy = item.cardIdCopy +
                            //     item.cardId.substring(item.cardId.length - 2, item.cardId.length);
                            item.cardIdCopy = item.cardId;
                        });
                    }
                    if (this.data.headPortraitUrl) {
                        this.entrance[0].showFileList = [];
                        this.entrance[0].showFileList.push({src: this.data.headPortraitUrl, w: '', h: '', name: ''});
                    }
                    if (this.data.userStatus === 'NORMAL')
                        this.data.userStatus = '正常';
                    if (this.data.userStatus === 'FROZENFUNDS')
                        this.data.userStatus = '冻结资金';
                    if (this.data.userStatus === 'FROZENLOGIN')
                        this.data.userStatus = '冻结登录';
                    if (this.data.dealerData.rank === 'COMMON')
                        this.data.rank = '普通用户';
                    if (this.data.dealerData.rank === 'MEMBER')
                        this.data.rank = '会员用户';
                    if (this.data.dealerData.rank === 'PARTNER')
                        this.data.rank = '合伙人';
                    this.data.addressListCopy = [];
                    if (this.data.addressList) {
                        this.data.addressList.forEach((item) => {
                            if (item) {
                                this.data.addressListCopy.push({
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
                    }
                    if (this.data.loginData && this.data.loginData.time)
                        this.data.loginData.time = this.dataService.timeStamp2formDta(this.data.loginData.time);
                    this.loginData = [];
                    if (this.data.loginData) {
                        this.loginData.push(this.data.loginData);
                        this.source.load(this.loginData);
                    }
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(err => {
            this.toast.error('网络错误！');
        });
    }

    closeModal() {
        this.activeModal.close('cancel');
    }

    goToEdit() {
        this.isEdit = true;
    }

    addBank() {
        this.data.bankCardList.push({
            bankName: '',
            cardId: '',
        });
    }

    phoneChange(e) {
        const temp = e.target.value;
        if (temp) {
            if (temp.indexOf('****') !== -1 && e.keyCode === 8) {
                e.target.value = '';
                return;
            } else {
                e.target.value = temp.replace(/\D/g, '');
            }
        }
    }

    bankCardChange(e, index) {
        const temp = e.target.value;
        if (temp) {
            if (temp.indexOf('*') !== -1) {
                e.target.value = '';
                return;
            } else {
                e.target.value = temp.replace(/\D/g, '');
                this.data.bankCardList[index].cardId = e.target.value;
            }
        }
    }

    addAddress() {
        this.data.addressListCopy.push({
            address: {
                id: '',
                type: '',
                options: {
                    types: this.china.getTypes(),
                    jumps: this.china.getJumps(),
                    data: this.china.getData.bind(this.china),
                },
            },
            detail: '',
            mobileNumber: '',
            receiver: '',
        });
    }

    delIdCard() {
        if (this.data && this.data.realAuthData) {
            this.data.realAuthData.realName = '';
            this.data.realAuthData.idCard = '';
            this.data.realAuthData.realNameCopy = '';
            this.data.realAuthData.idCardCopy = '';
        }
    }

    delBank(index) {
        if (this.data.bankCardList.length > index) {
            this.data.bankCardList.splice(index, 1);
        }
    }

    delAddress(index) {
        if (this.data.addressListCopy.length > index) {
            this.data.addressListCopy.splice(index, 1);
        }
    }

    onSubmit(f: NgForm) {
        const temp = f.value;
        if (!temp.isSeller) {
            this.toast.warning('请选择用户身份');
            return;
        }
        if (!temp.userStatus) {
            this.toast.warning('请选择用户状态');
            return;
        }
        if (!temp.rank) {
            this.toast.warning('请选择会员等级');
            return;
        }
        // if (!temp.telephone) {
        //     this.toast.warning('请输入用户手机号');
        //     return;
        // }
        if (temp.telephone) {
            if (temp.telephone.indexOf('*') !== -1) {
                if (!this.dataService.checkPhone(this.data.telephone)) {
                    this.toast.warning('请输入有效用户手机号');
                    return;
                }
            } else {
                temp.telephone = temp.telephone.replace(/\D/g, '');
                if (!this.dataService.checkPhone(temp.telephone)) {
                    this.toast.warning('请输入有效用户手机号');
                    return;
                }
            }
        }
        for (let i = 0; i < this.data.addressListCopy.length; i++) {
            const item = this.data.addressListCopy[i];
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
        if (this.data.bankCardList.length > 0) {
            for (let i = 0; i < this.data.bankCardList.length; i++) {
                if (!this.data.bankCardList[i].bankName || !this.data.bankCardList[i].cardId) {
                    this.toast.warning('请填写完整的银行信息');
                    return;
                }
                if (!this.dataService.checkBankcardCode(this.data.bankCardList[i].cardId)) {
                    this.toast.warning('请填写正确的银行卡号');
                    return;
                }
            }
            this.data.bankCardList = this.dataService.replaceAllBlank(this.data.bankCardList);
        }
        const sendData = {};
        if (temp.userStatus === '正常')
            sendData['userStatus'] = 'NORMAL';
        if (temp.userStatus === '冻结资金')
            sendData['userStatus'] = 'FROZENFUNDS';
        if (temp.userStatus === '冻结登录')
            sendData['userStatus'] = 'FROZENLOGIN';
        if (temp.rank === '普通用户')
            sendData['rank'] = 'COMMON';
        if (temp.rank === '会员用户')
            sendData['rank'] = 'MEMBER';
        if (temp.rank === '合伙人')
            sendData['rank'] = 'PARTNER';
        if (temp.isSeller === '买家')
            sendData['sellerOrNot'] = 'false';
        if (temp.isSeller === '卖家')
            sendData['sellerOrNot'] = 'true';
        sendData['action'] = 'editUser';
        sendData['id'] = this.data.userId;
        sendData['nickName'] = temp.nickName;
        sendData['headPortrait'] = temp.headPortrait;
        // if (this.data.realAuthData) {
        //     sendData['realAuthData'] = JSON.stringify({
        //         'realName': this.data.realAuthData.realName,
        //         'idCard': this.data.realAuthData.idCard,
        //     });
        // }
        // realAuthData: JSON.stringify({'realName' : temp.realName, 'idCard' : temp.idCard}),
        sendData['telephone'] = temp.telephone.indexOf('*') === -1 ? temp.telephone : this.data.telephone;
        sendData['realName'] = this.data.realAuthData ? this.data.realAuthData.realName : '';
        sendData['idCard'] = this.data.realAuthData ? this.data.realAuthData.idCard : '';
        sendData['wechatNumber'] = temp.wechatNumber;
        sendData['balance'] = temp.balance;
        sendData['addressList'] = JSON.stringify(this.addressListForSubmit);
        sendData['bankCardList'] = JSON.stringify(this.data.bankCardList);
        if (this.entrance[0].showFileList.length > 0 && this.entrance[0].showFileList[0].w) {
            this.imageUpload.uploadEntrance(this.entrance, sendData).then(data => {
                this.submit(data);
            }).catch(() => {
                this.toast.error('图片上传失败');
            });
        } else {
            this.submit(sendData);
        }
    }

    addParent() {
        if (this.data && this.data.userId) {
            this.dataService.sendRequest({
                action: 'addAgentById',
                parentId: this.parentId,
                userId: this.data.userId,
            }).then(res => {
                if (res['serviceCall']) {
                    const callData = this.dataService.getCallData(res);
                    if (callData.result === 'success') {
                        this.toast.success('添加成功！');
                    } else {
                        this.toast.error(callData.msg);
                    }
                }
            }).catch(() => {
                this.toast.error('网络错误！');
            });
        }
    }

    submit(sendData) {
        this.dataService.sendPostRequest(sendData).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.toast.success('保存成功！');
                    this.activeModal.close('success');
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(() => {
            this.toast.error('网络错误！');
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
