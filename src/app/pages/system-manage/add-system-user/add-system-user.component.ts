import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../service/dataService';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';


@Component({
    selector: 'ngx-add-system-user',
    templateUrl: './add-system-user.component.html',
    styleUrls: ['./add-system-user.component.scss'],
})
export class AddSystemUserComponent implements OnInit {

    confirm: any = 'cancel';

    nickname: any;
    username: any;
    password: any;
    dataAuth: any;

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

    source: LocalDataSource = new LocalDataSource();
    modalHeader: any = '';
    create:boolean = true;

    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService,
                private toast: ToastrService) {
        // const data = this.service.getData();
        // this.source.load(data);

    }

    ngOnInit() {
    }

    closeModal() {
        this.activeModal.close(this.confirm);
    }

    onSubmit(e: NgForm) {
        const temp = e.value;
        if (temp.username && temp.password && temp.nickname) {
            this.dataService.sendRequest({
                action: 'addSystemUser',
                username: temp.username,
                password: temp.password,
                nickname: temp.nickname,
            }).then(res => {
                if (res['serviceCall']) {
                    const callData = this.dataService.getCallData(res);
                    if (callData.result === 'success') {
                        this.confirm = 'success';
                        this.getNewUserPermission();
                        this.create = false;
                        // this.activeModal.close(this.confirm);
                        this.toast.success('添加成功！');
                    }
                }
            }).catch(() => {
                this.toast.error('网络错误！');
                // console.log(err)
            });
        } else {
            this.toast.warning('输入不得为空！');
        }
    }

    getNewUserPermission() {
        this.dataService.sendRequest({
            action: 'getSystemUserDetail',
            username: this.username,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.dataAuth = callData.data.adminUserAuth;
                    this.source.load(this.dataAuth);
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
            username: this.username,
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
                    this.toast.success('保存成功!');
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
