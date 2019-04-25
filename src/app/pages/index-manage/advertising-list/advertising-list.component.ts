import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {AdvertisingListCustomRenderComponent} from './custom-render-component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateAdSpaceComponent} from '../create-ad-space/create-ad-space.component';
import {DataService} from '../../../service/dataService';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-advertising-list',
    templateUrl: './advertising-list.component.html',
    styleUrls: ['./advertising-list.component.scss'],
})
export class AdvertisingListComponent implements OnInit {

    settings = {
        columns: {
            id: {
                title: '广告位id',
                type: 'string',
            },
            name: {
                title: '广告位标题',
                type: 'string',
            },
            location: {
                title: '样式',
                type: 'string',
            },
            // inter: {
            //     title: '接口',
            //     type: 'string',
            // },
            operate: {
                title: '操作',
                type: 'custom',
                renderComponent: AdvertisingListCustomRenderComponent,
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

    constructor(private router: Router,
                private modalService: NgbModal,
                public dataService: DataService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getAdvertPosList',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.data = callData.list;
                    this.source.load(this.data);
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(err => {
            this.toast.success('网络错误！');
        });
    }

    refresh() {
        this.ngOnInit();
    }

    onSubmit(f: NgForm) {
        const temp = f.value;
        const sendData = {};
        temp.id = this.dataService.replaceStringBlank(temp.id);
        if (temp.id) {
            sendData['id'] = temp.id;
        }
        temp.name = this.dataService.trimStr(temp.name);
        if (temp.name) {
            sendData['name'] = temp.name;
        }
        if (JSON.stringify(sendData) !== '{}') {
            sendData['action'] = 'searchAdvertPositionLists';
            this.dataService.sendRequest(sendData).then(res => {
                if (res['serviceCall']) {
                    const callData = this.dataService.getCallData(res);
                    if (callData.result === 'success') {
                        this.toast.success('搜索成功！');
                        this.data = callData.list ? callData.list : [];
                        this.source.load(this.data);
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

    createAdSpace() {
        const activeModal = this.modalService.open(CreateAdSpaceComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '创建广告位';
        activeModal.result.then(confirm => {
            if (confirm === 'success') {
                this.ngOnInit();
            }
        });
    }

}
