import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableService} from '../../../@core/data/smart-table.service';
import {ActivityCommodityListCustomRenderComponent} from './custom-render-component';
import {DataService} from '../../../service/dataService';
import {ActivityCommodityListModalComponent,
} from './activity-commodity-list-modal/activity-commodity-list-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-activity-commodity-list',
    templateUrl: './activity-commodity-list.component.html',
    styleUrls: ['./activity-commodity-list.component.scss'],
})
export class ActivityCommodityListComponent implements OnInit {

    settings = {
        columns: {
            activityGoodsId: {
                title: '活动商品ID',
                type: 'string',
            },
            goodsId: {
                title: '商品ID',
                type: 'string',
            },
            activityGoodsName: {
                title: '活动商品名称',
                type: 'string',
            },
            operate: {
                title: '操作',
                type: 'custom',
                renderComponent: ActivityCommodityListCustomRenderComponent,
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
    rowData: any;
    source: LocalDataSource = new LocalDataSource();
    data: any;
    icon: any = 'flip-2';

    constructor(private router: Router,
                private service: SmartTableService,
                private route: ActivatedRoute,
                public dataService: DataService,
                private toast: ToastrService,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                if (params.rowData) {
                    this.rowData = JSON.parse(params.rowData);
                    this.updateList();
                }
            });
    }

    updateList() {
        this.dataService.sendRequest({
            action: 'getActivityGoodsList',
            activityId: this.rowData.id,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.data = callData.list;
                    this.data.forEach(item => {
                        item.activityId = this.rowData.id;
                        item.activityName = this.rowData.activityName;
                    });
                    this.source.load(this.data);
                    console.log(this.data);
                }
            }
        }).catch(() => {
            this.toast.error('网络错误');
        });
    }

    refresh() {
        this.updateList();
    }

    onSubmit(e: NgForm) {
        const temp = e.value;
        this.dataService.sendRequest({
            action: 'searchActivityGoods',
            activityId: this.rowData.id,
            goodsId: temp.id,
            activityGoodsName: temp.name,
        }).then(res => {
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
    }

    addCommodity() {
        const activeModal = this.modalService.open(ActivityCommodityListModalComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '添加活动关联商品';
        activeModal.componentInstance.isEdit = true;
        this.rowData.activityId = this.rowData.id;
        activeModal.componentInstance.activityData = this.rowData;
        activeModal.result.then(confirm => {
            if (confirm === 'success') {
                this.ngOnInit();
            }
        });
    }

}
