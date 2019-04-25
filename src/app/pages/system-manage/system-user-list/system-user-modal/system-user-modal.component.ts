import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LocalDataSource} from 'ng2-smart-table';
import {DataService} from '../../../../service/dataService';
import {NbDialogService,} from '@nebular/theme';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-system-user-modal',
    templateUrl: './system-user-modal.component.html',
    styleUrls: ['./system-user-modal.component.scss'],
})
export class SystemUserModalComponent implements OnInit {

    settings = {
        actions: {
            add: false,
            edit: true,
            delete: false,
        },
        hideSubHeader: true,
        perPage: 5,
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmSave: true,
        },
        columns: {
            ch: {
                title: '菜单/权限',
                type: 'string',
                editable: false,
            },
            menu: {
                title: 'Menu/permission',
                type: 'string',
                editable: false,
            },
            view: {
                title: '查看',
                type: 'html',
                editor: {
                    type: 'list',
                    config: {
                        selectText: 'Select',
                        list: [
                            {value: 'true', title: 'true'},
                            {value: 'false', title: 'false'},
                        ],
                    },
                },
            },
            search: {
                title: '查询',
                type: 'html',
                editor: {
                    type: 'list',
                    config: {
                        selectText: 'Select',
                        list: [
                            {value: 'true', title: 'true'},
                            {value: 'false', title: 'false'},
                        ],
                    },
                },
            },
            add: {
                title: '创建',
                type: 'html',
                editor: {
                    type: 'list',
                    config: {
                        selectText: 'Select',
                        list: [
                            {value: 'true', title: 'true'},
                            {value: 'false', title: 'false'},
                        ],
                    },
                },
            },
            edit: {
                title: '编辑',
                type: 'html',
                editor: {
                    type: 'list',
                    config: {
                        selectText: 'Select',
                        list: [
                            {value: 'true', title: 'true'},
                            {value: 'false', title: 'false'},
                        ],
                    },
                },
            },
            delete: {
                title: '删除',
                type: 'html',
                editor: {
                    type: 'list',
                    config: {
                        selectText: 'Select',
                        list: [
                            {value: 'true', title: 'true'},
                            {value: 'false', title: 'false'},
                        ],
                    },
                },
            },
            output: {
                title: '导出',
                type: 'html',
                editor: {
                    type: 'list',
                    config: {
                        selectText: 'Select',
                        list: [
                            {value: 'true', title: 'true'},
                            {value: 'false', title: 'false'},
                        ],
                    },
                },
            },
        },
    };
    data: any;
    source: LocalDataSource = new LocalDataSource();
    dataAuth: any;
    dataUser: any;

    isEdit: any = false;
    modalHeader: any = '';

    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService,
                private dialogService: NbDialogService,
                private toast: ToastrService) {

    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getSystemUserDetail',
            username: this.data.username,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.dataAuth = callData.data.adminUserAuth;
                    this.dataUser = callData.data.adminUserData;
                    this.source.load(this.dataAuth);
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

    cancel() {
        this.activeModal.close('cancel');
    }

    goToEdit() {
        this.isEdit = true;
    }

    onSubmit(f: NgForm) {
        const temp = f.value;
        this.dataService.sendRequest({
            action: 'editSystemUser',
            username: temp.username,
            nickname: temp.nickname,
            password: temp.password,
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
        this.dataService.sendRequest({
            action: 'editSystemUserAuth',
            username: this.dataUser.username,
            ch: e.newData.ch,
            menu: e.newData.menu,
            view: e.newData.view,
            search: e.newData.search,
            add: e.newData.add,
            edit: e.newData.edit,
            delete: e.newData.delete,
            output: e.newData.output,
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
    }

}
