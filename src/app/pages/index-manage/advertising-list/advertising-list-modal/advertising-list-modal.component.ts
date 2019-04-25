import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../../service/dataService';
import {NbDialogService} from '@nebular/theme';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
// import {SmartTableService} from '../../../../@core/data/smart-table.service';
// import {LocalDataSource} from 'ng2-smart-table';

@Component({
    selector: 'ngx-advertising-list-modal',
    templateUrl: './advertising-list-modal.component.html',
    styleUrls: ['./advertising-list-modal.component.scss'],
})
export class AdvertisingListModalComponent implements OnInit {

    isEdit: any = false;
    data: any;
    modalHeader: any = '';

    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService,
                private dialogService: NbDialogService,
                private toast: ToastrService) {

    }

    closeModal() {
        this.activeModal.close('cancel');
    }

    goToEdit() {
        this.isEdit = true;
    }

    ngOnInit() {
        console.log(this.data);
        // this.dataService.sendRequest({
        //     action: 'getAdvertPosDetail',
        //     id: this.data.id,
        // }).then(res => {
        //     if (res['serviceCall']) {
        //         const callData = this.dataService.getCallData(res);
        //         if (callData.result === 'success') {
        //             console.log(callData);
        //             // this.toast.success('保存成功！');
        //             // this.activeModal.close('success');
        //         } else {
        //             this.toast.error(callData.msg);
        //         }
        //     }
        // }).catch(() => {
        //     this.toast.error('网络错误！');
        // });
    }

    onSubmit(f: NgForm) {
        const temp = f.value;
        this.dataService.sendRequest({
            action: 'editAdvertPos',
            id: this.data.id,
            name: temp.name,
            length: temp.length,
            width: temp.width,
            seq: temp.seq,
            location: temp.location,
            remarks: temp.remarks,
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

}
