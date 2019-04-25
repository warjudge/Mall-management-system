import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LocalDataSource} from 'ng2-smart-table';
import {DataService} from '../../../../service/dataService';
import {NbDialogService} from '@nebular/theme';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-partner-list-modal',
    templateUrl: './partner-list-modal.component.html',
    styleUrls: ['./partner-list-modal.component.scss'],
})
export class PartnerListModalComponent implements OnInit {

    settings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        hideSubHeader: true,
        pager: {
            perPage: 5,
        },
        columns: {
            userStrId: {
                title: '用户id',
                type: 'string',
                editable: false,
            },
            inviteProfit: {
                title: '累计推荐返佣',
                type: 'string',
                editable: false,
            },
            linkProfit: {
                title: '累计推广返佣',
                type: 'string',
                editable: false,
            },
            teamProfit: {
                title: '累计团队返佣',
                type: 'string',
                editable: false,
            },
            trainProfit: {
                title: '累计培训费',
                type: 'string',
                editable: false,
            },
            inviteTime: {
                title: '邀请成功时间',
                type: 'string',
                editable: false,
            },
            parentUserId: {
                title: '邀请人id',
                type: 'string',
                editable: false,
            },
            direct: {
                title: '邀请关系',
                type: 'string',
                editable: false,
            },
        },
    };

    source1: LocalDataSource = new LocalDataSource();
    source2: LocalDataSource = new LocalDataSource();
    data: any;
    partnerDetail: any;
    data1: any;
    data2: any;
    agentsNumber: any;
    fansNumber: any;

    isEdit: any = false;
    modalHeader: any = '';

    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService,
                private dialogService: NbDialogService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getPartnerUserDetail',
            id: this.data.userId,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.partnerDetail = callData.data;
                    if (this.partnerDetail.userStatus === '正常') {
                        this.partnerDetail.userStatus = 'NORMAL';
                    }
                    if (this.partnerDetail.userStatus === '冻结资金') {
                        this.partnerDetail.userStatus = 'FROZENFUNDS';
                    }
                    if (this.partnerDetail.userStatus === '冻结登录') {
                        this.partnerDetail.userStatus = 'FROZENLOGIN';
                    }
                    // console.log(this.partnerDetail);
                    this.data1 = callData.data.dealerData.agentsList;
                    this.data2 = callData.data.dealerData.fansList;
                    this.agentsNumber = this.data1.length;
                    this.fansNumber = this.data2.length;
                    this.data1.forEach(item => {
                        item.inviteTime = this.dataService.timeStamp2formDta(item.inviteTime);
                        item.direct = item.direct ? '直接会员' : '间接会员';
                        // item.dealerProfit = item.dealerProfit ? this.toFixed(item.dealerProfit) + '元' : 0;
                        item.inviteProfit = item.inviteProfit ? this.toFixed(item.inviteProfit) + '元' : 0;
                        item.linkProfit = item.linkProfit ? this.toFixed(item.linkProfit) + '元' : 0;
                        item.trainingProfit = item.trainingProfit ? this.toFixed(item.trainingProfit) + '元' : 0;
                    });
                    this.data2.forEach(item => {
                        item.inviteTime = this.dataService.timeStamp2formDta(item.inviteTime);
                        item.direct = item.direct ? '直接粉丝' : '间接粉丝';
                        // item.dealerProfit = item.dealerProfit ? this.toFixed(item.dealerProfit) + '元' : 0;
                        item.inviteProfit = item.inviteProfit ? this.toFixed(item.inviteProfit) + '元' : 0;
                        item.linkProfit = item.linkProfit ? this.toFixed(item.linkProfit) + '元' : 0;
                        item.trainingProfit = item.trainingProfit ? this.toFixed(item.trainingProfit) + '元' : 0;
                    });
                    this.source1.load(this.data1);
                    this.source2.load(this.data2);

                    // callData.loginData.time = this.dataService.timeStamp2formDta(callData.loginData.time);

                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(() => {
            this.toast.error('网络错误！');
        });
    }

    addUser(f) {
        const temp = f.value;
        if (!temp.userId) {
            this.toast.warning('请输入用户ID');
            return;
        }
        this.dataService.sendRequest({
            action: 'addAgentById',
            parentId: this.data.userId,
            userId: temp.userId,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.toast.success('添加成功！');
                    this.activeModal.close('success');
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(() => {
            this.toast.error('网络错误！');
        });
    }

    toFixed(data) {
        return data.toFixed(2);
    }

    closeModal() {
        this.activeModal.close();
    }

    onSubmit(f: NgForm) {
        const temp = f.value;
        if (!temp.nickName) {
            this.toast.warning('请输入用户名');
            return;
        }
        if (temp.balance !== 0 && !temp.balance) {
            this.toast.warning('请输入用户余额');
            return;
        }
        if (!temp.userStatus) {
            this.toast.warning('请选择用户状态');
            return;
        }
        this.dataService.sendRequest({
            action: 'editPartnerUser',
            id: this.data.userId,
            nickName: temp.nickName,
            balance: temp.balance,
            userStatus: temp.userStatus,
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

}
