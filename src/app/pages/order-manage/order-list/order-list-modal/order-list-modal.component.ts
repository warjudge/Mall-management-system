import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../../service/dataService';
import {NbDialogService} from '@nebular/theme';
import {NgForm} from '@angular/forms';
import {AddressDataChinaService} from '../../../address/data.service';
import {ToastrService} from 'ngx-toastr';
import {ClipboardService} from 'ngx-clipboard';

@Component({
    selector: 'ngx-order-list-modal',
    templateUrl: './order-list-modal.component.html',
    styleUrls: ['./order-list-modal.component.scss'],
})
export class OrderListModalComponent implements OnInit {
    // source: LocalDataSource = new LocalDataSource();
    data: any;
    orderDetail: any;
    isEdit: any = false;
    modalHeader: any = '';
    address: any = {
        id: '',
        type: '',
        values: '',
        options: {
            types: this.china.getTypes(),
            jumps: this.china.getJumps(),
            data: this.china.getData.bind(this.china),
        },
    };
    addressForSubmit: any = {
        province: '',
        city: '',
        area: '',
        detail: '',
        mobileNumber: '',
        receiver: '',
    };
    arrayOfArea: any = [];
    arrayOfAreaString: any;
    arrayOfAreaCode: any;
    goodsList: any = [];

    constructor(private activeModal: NgbActiveModal,
                public dataService: DataService,
                private dialogService: NbDialogService,
                private toast: ToastrService,
                private china: AddressDataChinaService,
                private clip: ClipboardService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getOrderDetailById',
            orderId: this.data.orderId,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.orderDetail = callData.list;
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

    toFixed(data) {
        return data.toFixed(2);
    }

    goToEdit() {
        this.isEdit = true;
    }

    send(e: NgForm) {
        const temp = e.value;
        temp.logisticsCompany = this.dataService.trimStr(temp.logisticsCompany);
        if (!temp.logisticsCompany) {
            this.toast.warning('请输入快递公司');
            return;
        }
        temp.logisticsNumber = this.dataService.trimStr(temp.logisticsNumber);
        if (!temp.logisticsNumber) {
            this.toast.warning('请输入快递单号');
            return;
        }
        this.dataService.sendRequest({
            action: 'delivery',
            orderId: this.orderDetail[0].orderId,
            logisticsCompany: temp.logisticsCompany,
            logisticsNumber: temp.logisticsNumber,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.toast.success('发货成功');
                    this.activeModal.close('success');
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(() => {
            this.toast.warning('网络错误');
        });
    }

    onSubmit(f: NgForm) {
        this.arrayOfAreaString = this.china.getString(this.address.id);
        this.arrayOfArea = this.arrayOfAreaString.split(' ');
        this.addressForSubmit.province = this.arrayOfArea[0];
        this.addressForSubmit.city = this.arrayOfArea[1];
        this.addressForSubmit.area = this.arrayOfArea[2];
        const temp = f.value;
        this.dataService.sendRequest({
            action: 'editOrder',
            orderId: this.data.orderId,
            status: temp.status,
            lock: temp.lock,
            logisticsCompany: temp.logisticsCompany,
            logisticsId: temp.logisticsId,
            buyerAddressData: JSON.stringify(this.addressForSubmit),
        }).then(res => {
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

    clipAddress() {
        if (this.orderDetail && this.orderDetail[0] && this.orderDetail[0].addressData) {
            this.clip.copyFromContent(this.orderDetail[0].addressData.receiver + ' ' +
                this.orderDetail[0].addressData.mobileNumber + ' ' + this.orderDetail[0].addressData.province + ' ' +
                this.orderDetail[0].addressData.city + ' ' + this.orderDetail[0].addressData.area + ' ' +
                this.orderDetail[0].addressData.detail);
            this.toast.success('复制成功');
        }

    }

    delayDeliveryDealine(item) {
        this.dataService.sendRequest({
            action: 'delayDeliveryDealine',
            orderId: this.orderDetail[0].orderId,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.toast.success('延长收货成功');
                    this.activeModal.close('success');
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(() => {
            this.toast.error('网络错误');
        });
    }

}
