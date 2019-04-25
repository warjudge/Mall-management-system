import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {DataService} from '../../../service/dataService';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-member-level-setting',
    templateUrl: './member-level-setting.component.html',
    styleUrls: ['./member-level-setting.component.scss'],
})
export class MemberLevelSettingComponent implements OnInit {

    data: any;
    icon: any = 'flip-2';

    constructor(private dataService: DataService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getMemberLevelSetting',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success' && callData.data !== {}) {
                    this.data = callData.data;
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(err => {
            this.toast.error('网络错误！');
        });
    }

    refresh() {
        this.ngOnInit();
    }

    onSubmit(f: NgForm) {
        const temp = f.value;
        const r = /^\+?[1-9][0-9]*$/;
        if (!r.test(temp.inviteTimeLimit) || !r.test(temp.buyGoodsLimit)) {
            this.toast.warning('请输入正整数！');
            return;
        }
        this.dataService.sendRequest({
            action: 'saveMemberLevelSetting',
            inviteTimeLimit: temp.inviteTimeLimit,
            buyGoodsLimit: temp.buyGoodsLimit,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.toast.success('添加成功');
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(err => {
            this.toast.error('网络错误');
        });
    }
}
