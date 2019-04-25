import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableService} from '../../../@core/data/smart-table.service';
import {WarehouseListCustomRenderComponent} from './custom-render-component';
import {DataService} from '../../../service/dataService';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddWarehouseComponent} from '../add-warehouse/add-warehouse.component';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-warehouse-list',
    templateUrl: './warehouse-list.component.html',
    styleUrls: ['./warehouse-list.component.scss'],
})
export class WarehouseListComponent implements OnInit {


    settings = {
        columns: {
            createTime: {
                title: '仓库创建时间',
                type: 'string',
            },
            id: {
                title: '仓库序号',
                type: 'string',
            },
            warehouseName: {
                title: '仓库名称',
                type: 'string',
            },
            userId: {
                title: '用户ID',
                type: 'string',
            },
            sumCount: {
                title: '仓库总库存',
                type: 'string',
            },
            opt: {
                title: '操作',
                type: 'custom',
                renderComponent: WarehouseListCustomRenderComponent,
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
    user: boolean = false;

    constructor(private router: Router,
                private service: SmartTableService,
                public dataService: DataService,
                private modalService: NgbModal,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getWarehouseList',
            index: 0,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.initData(callData.list);
                }
            }
        }).catch(() => {
            this.toast.error('网络错误');
        });
    }

    initData(data) {
        this.data = data;
        this.data.forEach(item => {
            item.createTime = this.dataService.timeStamp2formDta(item.createTime);
        });
        this.source.load(this.data);
    }

    refresh() {
        this.ngOnInit();
    }

    create() {
        const activeModal = this.modalService.open(AddWarehouseComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: '',
        });
        activeModal.result.then(confirm => {
            if (confirm === 'success') {
                this.ngOnInit();
            }
        });
    }

    onSubmit(e: NgForm, opt) {
        const temp = e.value;
        let sendData: any = {};
        if (('' + temp.sumCountLower).indexOf('.') !== -1 || ('' + temp.sumCountUpper).indexOf('.') !== -1) {
            this.toast.warning('请输入正整数！');
            return;
        }
        if (temp.sumCountLower && temp.sumCountUpper) {

        } else if (!temp.sumCountLower && !temp.sumCountUpper) {

        } else {
            this.toast.warning('请输入完整的仓库库存！');
            return;
        }
        if (temp.idEquals) {
            sendData['idEquals'] = this.dataService.trimStr(temp.idEquals);
        }
        if (temp.sumCountLower) {
            sendData['sumCountLower'] = this.dataService.trimStr(temp.sumCountLower);
        }
        if (temp.createTimeLower) {
            sendData['createTimeLower'] = temp.createTimeLower._d.getTime();
        }
        if (temp.createTimeUpper) {
            sendData['createTimeUpper'] = temp.createTimeUpper._d.getTime();
        }
        if (temp.sumCountUpper) {
            sendData['sumCountUpper'] = this.dataService.trimStr(temp.sumCountUpper);
        }
        if (temp.userIdEquals) {
            sendData['userIdEquals'] = this.dataService.trimStr(temp.userIdEquals);
        }
        if (temp.warehouseNameLike) {
            sendData['warehouseNameLike'] = '%' + this.dataService.trimStr(temp.warehouseNameLike) + '%';
        }
        sendData = this.dataService.replaceAllBlank(sendData);
        if (opt === 'search') {
            if (JSON.stringify(sendData) !== '{}') {
                sendData.action = 'searchWarehouse';
                this.dataService.sendRequest(sendData).then(res => {
                    if (res['serviceCall']) {
                        const callData = this.dataService.getCallData(res);
                        if (callData.result === 'success') {
                            this.initData(callData.list);
                        }
                    }
                }).catch(() => {
                    this.toast.error('网络错误');
                });
            } else {
                this.ngOnInit();
            }
        } else {
            sendData.action = 'outputWarehouse';
            this.dataService.downfile(sendData);
        }


    }


}
