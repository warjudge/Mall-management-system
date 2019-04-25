import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
// import {SmartTableService} from '../../../../@core/data/smart-table.service';
// import {LocalDataSource} from 'ng2-smart-table';
import {DataService} from '../../../service/dataService';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-create-ad-space',
    templateUrl: './create-ad-space.component.html',
    styleUrls: ['./create-ad-space.component.scss'],
})
export class CreateAdSpaceComponent implements OnInit {

    confirm: any = 'cancel';
    modalHeader: any = '';

    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService,
                private toast: ToastrService) {

    }

    ngOnInit() {
    }

    closeModal() {
        this.activeModal.close(this.confirm);
    }

    onSubmit(e: NgForm) {
        const temp = e.value;
        if (temp.name && temp.length && temp.width && (temp.seq !== '') && temp.location) {
            this.dataService.sendRequest({
                action: 'addAdvertPos',
                name: temp.name,
                seq: temp.seq,
                location: temp.location,
                length: temp.length,
                width: temp.width,
                remarks: temp.remarks,
            }).then(res => {
                if (res['serviceCall']) {
                    const callData = this.dataService.getCallData(res);
                    if (callData.result === 'success') {
                        this.confirm = 'success';
                        this.activeModal.close(this.confirm);
                        this.toast.success('添加成功！');
                    } else {
                        this.toast.error(callData.msg);
                    }
                }
            }).catch(() => {
                this.toast.error('网络错误！');
                // console.log(err)
            });
        } else {
            this.toast.warning('输入不得为空！');
        }
    }

}
