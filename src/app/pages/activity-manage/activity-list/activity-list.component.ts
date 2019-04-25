import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableService} from '../../../@core/data/smart-table.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivityListCustomRenderComponent} from './custom-render-component';
import {CreateActivityComponent} from '../create-activity/create-activity.component';
import {DataService} from '../../../service/dataService';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-activity-list',
    templateUrl: './activity-list.component.html',
    styleUrls: ['./activity-list.component.scss'],
})
export class ActivityListComponent implements OnInit {

    settings = {
        columns: {
            id: {
                title: '活动id',
                type: 'string',
            },
            activityName: {
                title: '活动标题',
                type: 'string',
            },
            isEnabled: {
                title: '启用状态',
                type: 'string',
            },
            timeRange: {
                title: '启用时间',
                type: 'string',
            },
            operate: {
                title: '操作',
                type: 'custom',
                renderComponent: ActivityListCustomRenderComponent,
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
    source: LocalDataSource = new LocalDataSource();
    data: any;
    icon: any = 'flip-2';
    start: any;
    end: any;

    constructor(private router: Router,
                private service: SmartTableService,
                private modalService: NgbModal,
                public dataService: DataService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getActivityList',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.data = callData.list;
                    this.data.forEach(item => {
                        item.timeRange = '' + this.dataService.timeStamp2formDta(item.start) + '至'
                            + this.dataService.timeStamp2formDta(item.end);
                        item.isEnabled = item.isEnabled === 1 ? '开启' : '关闭';
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

    createActivity() {
        const activeModal = this.modalService.open(CreateActivityComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '创建活动';
        activeModal.componentInstance.isEdit = true;
        activeModal.result.then(confirm => {
            if (confirm === 'success') {
                this.ngOnInit();
            }
        });

    }

    onSubmit(e: NgForm) {
        const temp = e.value;
        const sendData = {};
        if (temp.start) {
            sendData['start'] = this.dataService.parseTime(temp.start._d);
        }
        if (temp.end) {
            sendData['end'] = this.dataService.parseTime(temp.end._d);
        }
        temp.activityId = this.dataService.replaceStringBlank(temp.activityId);
        if (temp.activityId) {
            sendData['id'] = temp.activityId;
        }
        temp.activityTitle = this.dataService.replaceStringBlank(temp.activityTitle);
        if (temp.activityTitle) {
            sendData['activityName'] = temp.activityTitle;
        }
        if (temp.state === '0' || temp.state === '1') {
            sendData['isEnabled'] = temp.state;
        }
        if (JSON.stringify(sendData) !== '{}') {
            sendData['action'] = 'searchActivity';
            this.dataService.sendRequest(sendData).then(res => {
                if (res['serviceCall']) {
                    const callData = this.dataService.getCallData(res);
                    if (callData.result === 'success') {
                        this.toast.success('搜索成功！');
                        this.data = callData.list ? callData.list : [];
                        if (this.data.length !== 0) {
                            this.data.forEach(item => {
                                item.timeRange = '' + this.dataService.timeStamp2formDta(item.start) + '至'
                                    + this.dataService.timeStamp2formDta(item.end);
                                item.isEnabled = item.isEnabled === 1 ? '开启' : '关闭';
                            });
                        }
                        this.source.load(this.data);
                    } else {
                        this.toast.error(callData.msg);
                    }
                }
            }).catch(err => {
                this.toast.error('网络错误');
            });
        } else {
            this.ngOnInit();
        }
    }

}
