import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableService} from '../../../@core/data/smart-table.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RecommendCommodityCustomRenderComponent} from './custom-render-component';
import {AddRecommendFieldComponent} from '../add-recommend-field/add-recommend-field.component';
import {DataService} from '../../../service/dataService';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-recommend-commodity',
    templateUrl: './recommend-commodity.component.html',
    styleUrls: ['./recommend-commodity.component.scss'],
})
export class RecommendCommodityComponent implements OnInit {

    settings = {
        columns: {
            recommendGoodId: {
                title: '推荐商品ID',
                type: 'string',
            },
            goodsId: {
                title: '关联商品ID',
                type: 'string',
            },
            createTime: {
                title: '创建时间',
                type: 'string',
            },
            state: {
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
                renderComponent: RecommendCommodityCustomRenderComponent,
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
            action: 'getRecommendCommodityList',
            index: 0,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    if (callData.list) {
                        this.data = callData.list;
                        this.initData();
                    }
                }
            }

        }).catch(err => {
            this.toast.error('网络错误！');
        });
    }

    initData() {
        this.data.forEach(item => {
            item.timeRange = '' + this.dataService.timeStamp2formDta(item.start) + ' 至 '
                + this.dataService.timeStamp2formDta(item.end);
            item.state = item.state === 1 ? '开启' : '关闭';
            item.createTime = this.dataService.timeStamp2formDta(item.createTime);
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
        // if (this.dataService.replaceStringBlank(temp.sequence)) {
        //     sendData['sequence'] = temp.sequence;
        // }
        temp.goodsId = this.dataService.replaceStringBlank(temp.goodsId);
        if (temp.goodsId) {
            sendData['goodsId'] = temp.goodsId;
        }
        if (temp.state === '0' || temp.state === '1') {
            sendData['state'] = temp.state;
        }
        if (JSON.stringify(sendData) !== '{}') {
            sendData['action'] = 'searchRecommendCommodity';
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

    addField() {
        const activeModal = this.modalService.open(AddRecommendFieldComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });

        activeModal.componentInstance.modalHeader = '添加推荐商品';
        activeModal.componentInstance.isEdit = true;
        activeModal.result.then(confirm => {
            if (confirm === 'success') {
                this.ngOnInit();
            }
        });
    }

}
