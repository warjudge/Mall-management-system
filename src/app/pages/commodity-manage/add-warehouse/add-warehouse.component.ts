import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../service/dataService';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-add-warehouse',
    templateUrl: './add-warehouse.component.html',
    styleUrls: ['./add-warehouse.component.scss'],
})
export class AddWarehouseComponent implements OnInit {

    confirm: any;
    modalHeader: any = '';
    user: boolean = false;
    defaultUid: any = 'user_abbhaaaaaab';

    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getSellerId',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.defaultUid = callData.data;
                    this.updateUser({target: {value: this.defaultUid}});
                }
            }
        }).catch(() => {
        });

    }

    closeModal() {
        this.confirm = 'cancel';
        this.activeModal.close(this.confirm);
    }

    updateUser(e) {
        if (e.target.value) {
            this.dataService.sendRequest({
                action: 'getUserDetail',
                id: e.target.value,
            }).then(res => {
                if (res['serviceCall']) {
                    const callData = this.dataService.getCallData(res);
                    this.user = !!(callData.result === 'success' && callData.data);
                } else {
                    this.user = false;
                }
            }).catch(() => {
                this.toast.error('网络错误');
                this.user = false;
            });
        } else {
            this.user = false;
        }
    }

    onSubmit(e: NgForm) {
        const temp = e.value;
        if (!temp.warehouseName) {
            this.toast.error('请输入仓库名');
            return;
        }
        // if (!temp.seller) {
        //     this.toast.error('请输入仓库所属卖家ID');
        //     return;
        // }
        // if (!this.user) {
        //     this.toast.error('请输入有效卖家ID');
        //     return;
        // }
        this.dataService.sendRequest({
            action: 'addWarehouse',
            warehouseName: temp.warehouseName,
            vendorId: this.defaultUid, // temp.seller,
            remarks: temp.remarks,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.confirm = 'success';
                    this.activeModal.close(this.confirm);
                    this.toast.success('添加成功');
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(() => {
            this.toast.error('网络错误');
            // console.log(err)
        });

    }

    cancel() {
        this.activeModal.close('cancel');
    }

}
