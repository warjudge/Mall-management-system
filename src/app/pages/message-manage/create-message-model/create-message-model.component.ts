import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../service/dataService';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-create-message-model',
    templateUrl: './create-message-model.component.html',
    styleUrls: ['./create-message-model.component.scss'],
})
export class CreateMessageModelComponent implements OnInit {

    confirm: any = 'cancel';
    modalHeader: any = '';
    contentVo: any = [];

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
        if (temp.templateId === '' || temp.title === '' || temp.id === '') {
            this.toast.warning('模板序号与微信模板id以及消息标题为必填项！');
            return;
        }
        if (temp.key1) {
            this.contentVo.push({
                key: temp.key1,
                val: temp.val1,
            })
        }
        if (temp.key2) {
            this.contentVo.push({
                key: temp.key2,
                val: temp.val2,
            })
        }
        if (temp.key3) {
            this.contentVo.push({
                key: temp.key3,
                val: temp.val3,
            })
        }
        if (temp.key4) {
            this.contentVo.push({
                key: temp.key4,
                val: temp.val4,
            })
        }
        if (temp.key5) {
            this.contentVo.push({
                key: temp.key5,
                val: temp.val5,
            })
        }
        this.dataService.sendRequest({
            action: 'addMessageTemplate',
            serialNumber: temp.id,
            templateId: temp.templateId,
            title: temp.title,
            content: JSON.stringify(this.contentVo),
            remark: temp.remark,
            url: temp.url,
            userType: temp.userType,
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
