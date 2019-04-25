import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LocalDataSource} from 'ng2-smart-table';
import {DataService} from '../../../../service/dataService';
import {NbDialogService,} from '@nebular/theme';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-settlement-list-modal',
    templateUrl: './settlement-list-modal.component.html',
    styleUrls: ['./settlement-list-modal.component.scss'],
})
export class SettlementListModalComponent implements OnInit {

    settings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        hideSubHeader: true,
        pager: {perPage: 5},
        columns: {
            orderEndTime: {
                title: '订单成功时间',
                type: 'string',
                editable: false,
            },
            invited: {
                title: '被邀请人',
                type: 'string',
                editable: false,
            },
            goodsId: {
                title: '商品id',
                type: 'string',
                editable: false,
            },
            goodsTitle: {
                title: '商品标题',
                type: 'string',
                editable: false,
            },
            profitType: {
                title: '返佣类型',
                type: 'string',
                editable: false,
            },
            profit: {
                title: '结算金额',
                type: 'string',
                editable: false,
            },
        },
    };

    source: LocalDataSource = new LocalDataSource();

    isEdit: any = false;
    modalHeader: any = '';
    data: any;
    settlementDetail: any;

    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService,
                private dialogService: NbDialogService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getBuyerSettleDetail',
            settleNumber: this.data.settleNumber,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res)
                if (callData.result === 'success') {
                    this.settlementDetail = callData.data;
                    this.settlementDetail.balanceDetailVos.forEach(item =>{
                        item.orderEndTime = item.orderEndTime==='0'?'':this.dataService.timeStamp2formDta(item.orderEndTime);
                    })
                    this.source.load(this.settlementDetail.balanceDetailVos);
                }
            }
        }).catch(err => {
            this.toast.error('网络错误！');
        });
    }

    closeModal() {
        this.activeModal.close();
    }

}
