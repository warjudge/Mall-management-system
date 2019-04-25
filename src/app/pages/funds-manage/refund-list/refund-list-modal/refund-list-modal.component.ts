import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../../service/dataService';
import {NbDialogService,} from '@nebular/theme';
import {ToastrService} from 'ngx-toastr';


@Component({
    selector: 'ngx-refund-list-modal',
    templateUrl: './refund-list-modal.component.html',
    styleUrls: ['./refund-list-modal.component.scss'],
})
export class RefundListModalComponent implements OnInit {

    isEdit: any = false;
    modalHeader: any;
    data: any;
    refundDetail: any;

    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService,
                private dialogService: NbDialogService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getPayRefundDetail',
            orderId: this.data.orderId,
            flowNumber: this.data.payNumber,
            isRefund: this.data.type === '退款',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    // console.log(callData);
                    this.refundDetail = callData.data;
                    this.refundDetail.createTime = this.refundDetail.createTime? this.dataService.timeStamp2formDta(this.refundDetail.createTime) : '';
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(() => {
            this.toast.error('网络错误！');
        });
    }

    closeModal() {
        this.activeModal.close();
    }

}
