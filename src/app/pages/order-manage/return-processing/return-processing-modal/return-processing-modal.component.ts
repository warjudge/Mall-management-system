import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../../service/dataService';
import {NbDialogService} from '@nebular/theme';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-return-processing-modal',
    templateUrl: './return-processing-modal.component.html',
    styleUrls: ['./return-processing-modal.component.scss'],
})
export class ReturnProcessingModalComponent implements OnInit {

    data: any;
    isEdit: any = false;
    modalHeader: any = '';
    currentIndex: any;
    orderData: any;

    seller: any;

    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService,
                private dialogService: NbDialogService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getSellerDetail',
            id: this.orderData.seller,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.data = callData.data.returnAddresses ? callData.data.returnAddresses : [];
                    if (this.data.length === 0) {
                        this.toast.warning('当前卖家没有退货地址');
                    }
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(() => {
            this.toast.error('网络错误');
        });
        // this.dataService.sendRequest({
        //     action: 'getRefundOrderDetail',
        //     orderId: this.data.orderId,
        // }).then(res => {
        //     if (res['serviceCall']) {
        //         const callData = this.dataService.getCallData(res);
        //         if (callData.result === 'success') {
        //             console.log(callData);
        //             this.returnDetail = callData.data;
        //             this.returnGoodsList = callData.data.returnGoodsList;
        //             this.sellerAddressList = callData.data.sellerAddressList;
        //             console.log(this.returnDetail);
        //         } else {
        //             this.toast.error(callData.msg);
        //         }
        //     }
        // }).catch(() => {
        //     this.toast.error('网络错误！');
        // });
    }

    stringify(data) {
        return JSON.stringify(data);
    }

    closeModal() {
        this.activeModal.close('cancel');
    }

    selectAddress(e) {
        this.currentIndex = e.value;
    }

    cancel() {
        this.activeModal.close('cancel');
    }

    onSubmit(f: NgForm) {
        const temp = f.value;
        if (!temp.address) {
            this.toast.warning('请选择退货地址');
        }
        this.dataService.sendRequest({
            action: 'agreeReturnGoods',
            orderId: this.orderData.orderId,
            refundNumber: this.orderData.refundNumber,
            goodsId: this.orderData.goodsId,
            returnAddressData: temp.address,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.toast.success('操作成功');
                    this.activeModal.close('success')
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(() => {
            this.toast.error('网络错误');
        })
    }

}
