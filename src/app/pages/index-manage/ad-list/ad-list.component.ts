import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {AdListCustomRenderComponent} from './custom-render-component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateAdComponent} from '../create-ad/create-ad.component';
import {DataService} from '../../../service/dataService';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-ad-list',
    templateUrl: './ad-list.component.html',
    styleUrls: ['./ad-list.component.scss'],
})
export class AdListComponent implements OnInit {

    settings = {
        columns: {
            id: {
                title: '广告id',
                type: 'string',
            },
            advertName: {
                title: '广告标题',
                type: 'string',
            },
            advertPositionName: {
                title: '广告位标题',
                type: 'string',
            },
            location: {
                title: '样式',
                type: 'string',
            },
            advertLinkUrl: {
                title: '跳转链接',
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
                renderComponent: AdListCustomRenderComponent,
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
                private modalService: NgbModal,
                public dataService: DataService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getIndexAdList',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.data = callData.list;
                    this.initData();
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(err => {
            this.toast.success('网络错误！');
        });
    }

    initData() {
        this.data.forEach((item) => {
            item.timeRange = this.dataService.timeStamp2formDta(item.start) +
                ' 至 ' + this.dataService.timeStamp2formDta(item.end);
            item.isEnabled = item.isEnabled === 1 ? '开启' : '关闭';
        });
        this.source.load(this.data);
    }

    refresh() {
        this.ngOnInit();
    }

    onSubmit(f: NgForm) {
        const temp = f.value;
        const sendData = {};
        if (temp.start) {
            sendData['start'] = this.dataService.parseTime(temp.start._d);
        }
        if (temp.end) {
            sendData['end'] = this.dataService.parseTime(temp.end._d);
        }
        temp.advertName = this.dataService.replaceStringBlank(temp.advertName);
        if (temp.advertName) {
            sendData['advertName'] = temp.advertName;
        }
        if (temp.state === '0' || temp.state === '1') {
            sendData['state'] = temp.state;
        }
        if (JSON.stringify(sendData) !== '{}') {
            sendData['action'] = 'searchAdvertLists';
            this.dataService.sendRequest(sendData).then(res => {
                if (res['serviceCall']) {
                    const callData = this.dataService.getCallData(res);
                    if (callData.result === 'success') {
                        this.toast.success('搜索成功！');
                        this.data = callData.list ? callData.list : [];
                        this.initData();
                    } else {
                        this.toast.error(callData.msg);
                    }
                }
            }).catch(() => {
                this.toast.error('网络错误！');
            });
        } else {
            this.ngOnInit();
        }
    }

    createAd() {
        const activeModal = this.modalService.open(CreateAdComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '创建广告';
        activeModal.result.then(confirm => {
            if (confirm === 'success') {
                this.ngOnInit();
            }
        });
    }

}
