import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LocalDataSource} from 'ng2-smart-table';
import {DataService} from '../../../../service/dataService';
import {NbDialogService} from '@nebular/theme';
import {AlertComponent} from '../../../modal-overlays/dialog/alert/alert.component';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-warehouse-list-modal',
    templateUrl: './warehouse-list-modal.component.html',
    styleUrls: ['./warehouse-list-modal.component.scss'],
})
export class WarehouseListModalComponent implements OnInit {

    settings = {
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmSave: true,
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        hideSubHeader: true,
        perPage: 5,
        columns: {
            goodsId: {
                title: '商品编号',
                type: 'string',
                editable: false,
            },
            category: {
                title: '商品类目',
                type: 'string',
                editable: false,
            },
            simpleName: {
                title: '商品标题',
                type: 'string',
                editable: false,
            },
            skuCount: {
                title: '库存数量',
                type: 'number',
                editable: false,
            },
        },
    };

    source: LocalDataSource = new LocalDataSource();

    isEdit: any = false;
    confirm: any;
    data: any;
    modalHeader: any = '';
    skuSum: any = '';
    user: boolean = false;

    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService,
                private dialogService: NbDialogService,
                private toast: ToastrService,
                // private service: SmartTableService
    ) {

    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getWarehouseDetail',
            id: this.data.id,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.data = callData.data;
                    if (this.data.sellerId) {
                        this.update(this.data.sellerId);
                    }
                    if (this.data.goodsListVo && this.data.goodsListVo.length > 0) {
                        this.source.load(this.data.goodsListVo);
                    }
                }
            }
        }).catch(() => {
        });
        // this.source.load(this.data.goodsListVo)
    }

    closeModal() {
        this.activeModal.close('cancel');
    }

    cancel() {
        this.activeModal.close('cancel');
    }

    goToEdit() {
        this.isEdit = true;
    }

    updateUser(e) {
        if (e.target.value) {
            this.update(e.target.value);
        } else {
            this.user = false;
        }
    }

    update(value) {
        this.dataService.sendRequest({
            action: 'getUserDetail',
            id: value,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                this.user = !!(callData.result === 'success' && callData.data);
            } else {
                this.user = false;
            }
        }).catch(() => {
            this.user = false;
            this.toast.error('网络错误');
        });
    }

    onSubmit(f: NgForm) {
        const temp = f.value;
        if (!temp.warehouseName) {
            this.toast.warning('请输入仓库名称');
            return;
        }
        // if (!temp.seller) {
        //     this.toast.warning('请输入仓库所属商家');
        //     return;
        // }
        // if (!this.user) {
        //     this.toast.error('请输入有效卖家ID');
        //     return;
        // }
        this.dataService.sendRequest({
            action: 'editWarehouse',
            id: this.data.id,
            remarks: temp.remarks,
            vendorId: this.data.sellerId,
            warehouseName: temp.warehouseName,
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

    onSaveConfirm(e) {
        const r = /^\+?[1-9][0-9]*$/;
        if (e.newData.skuCount) {
            if (r.test(e.newData.skuCount)) {
                this.dataService.sendRequest({
                    action: 'editCommoditySKUFromWarehouse',
                    goodsId: e.newData.goodsId,
                    id: this.data.id,
                    skuCount: e.newData.skuCount,
                }).then(res => {
                    if (res['serviceCall']) {
                        const callData = this.dataService.getCallData(res);
                        if (callData.result === 'success') {
                            this.toast.success('保存成功');
                            e.confirm.resolve(e.newData);
                            this.ngOnInit();
                        } else {
                            this.toast.error(callData.msg);
                        }
                    }
                }).catch(() => {
                    this.toast.error('网络错误！');
                });
            } else {
                this.toast.error('请输入有效库存数！');
            }
        } else {
            this.toast.error('请输入库存数！');
        }
    }

    onDeleteConfirm(e) {
        const confirm = this.dialogService.open(AlertComponent);
        confirm.componentRef.instance.message = '确认删除该商品？';
        confirm.onClose.subscribe(opt => {
            if (opt === 'confirm') {
                this.dataService.sendRequest({
                    action: 'delCommodityFromWarehouse',
                    goodsId: e.data.goodsId,
                    id: this.data.id,
                }).then(res => {
                    if (res['serviceCall']) {
                        const callData = this.dataService.getCallData(res);
                        if (callData.result === 'success') {
                            this.toast.success('删除成功！');
                            this.ngOnInit();
                        } else
                            this.toast.error(callData.msg);
                    }
                }).catch(err => {
                    this.toast.error('网络错误！');
                });
            }
        });
    }


}
