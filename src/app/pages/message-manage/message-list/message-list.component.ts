import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {MessageListCustomRenderComponent} from './custom-render-component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateMessageModelComponent} from '../create-message-model/create-message-model.component';
import {DataService} from '../../../service/dataService';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit {

    settings = {
        columns: {
            createTime: {
                title: '消息模板创建时间',
                type: 'string',
            },
            serialNumber: {
                title: '模板序号',
                type: 'string',
            },
            templateId: {
                title: '微信模板id',
                type: 'string',
            },
            title: {
                title: '消息标题',
                type: 'string',
            },
            content: {
                title: '消息内容',
                type: 'string',
            },
            userType: {
                title: '通知用户类型',
                type: 'string',
            },
            url: {
                title: '跳转链接',
                type: 'string',
            },
            operate: {
                title: '操作',
                type: 'custom',
                renderComponent: MessageListCustomRenderComponent,
                onComponentInitFunction: (instance) => {
                    instance.save.subscribe(row => {
                        if (row === 'success') {
                            this.ngOnInit();
                        }
                    });
                },
            },
        },
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        hideSubHeader: true,
        pager: {perPage: 5},
    };
    data: any;
    source: LocalDataSource = new LocalDataSource();
    icon: any = 'flip-2';

    constructor(private router: Router,
                private modalService: NgbModal,
                public dataService: DataService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getMessageTemplateList',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.data = JSON.parse(JSON.stringify(callData.list));
                    this.data.forEach(item => {
                        item.createTime = this.dataService.timeStamp2formDta(item.createTime);
                    });
                    this.source.load(this.data);
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(() => {
            this.toast.error('网络错误');
        });
    }

    refresh() {
        this.ngOnInit();
    }

    createMessageModel() {
        const activeModal = this.modalService.open(CreateMessageModelComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '创建消息';
        activeModal.result.then(confirm => {
            if (confirm === 'success') {
                this.ngOnInit();
            }
        });
    }


}
