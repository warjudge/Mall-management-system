import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../../service/dataService';
import {NbDialogService,} from '@nebular/theme';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-message-list-modal',
    templateUrl: './message-list-modal.component.html',
    styleUrls: ['./message-list-modal.component.scss'],
})
export class MessageListModalComponent implements OnInit {


    isEdit: any = false;
    modalHeader: any = '';
    data: any;
    messageDetail: any;
    contentVo: any = [];
    userType: boolean = false;

    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService,
                private dialogService: NbDialogService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        console.log(this.data);
        this.dataService.sendRequest({
            action: 'getMessageTemplateDetail',
            templateId: this.data.templateId,
            serialNumber: this.data.serialNumber,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    console.log(callData);
                    this.messageDetail = callData.data;
                    this.userType = callData.data.userType;
                    console.log(this.messageDetail);
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

    goToEdit() {
        this.isEdit = true;
    }

    onSubmit(f: NgForm) {
        const temp = f.value;
        // console.log( this.userType );return;
        this.contentVo = [
            {
                key: temp.key1,
                val: temp.val1,
            },
            {
                key: temp.key2,
                val: temp.val2,
            },
            {
                key: temp.key3,
                val: temp.val3,
            },
            {
                key: temp.key4,
                val: temp.val4,
            },
            {
                key: temp.key5,
                val: temp.val5,
            },
        ];
        this.dataService.sendRequest({
            action: 'editMessageTemplate',
            serialNumber: this.data.serialNumber,
            templateId: temp.templateId,
            title: temp.title,
            content: JSON.stringify(this.contentVo),
            remark: temp.remark,
            url: temp.url,
            userType: temp.userType + '',
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
