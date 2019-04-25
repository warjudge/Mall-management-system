import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {DataService} from '../../../service/dataService';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-member-commission-setting',
    templateUrl: './member-commission-setting.component.html',
    styleUrls: ['./member-commission-setting.component.scss'],
})
export class MemberCommissionSettingComponent implements OnInit {

    data: any;
    icon: any = 'flip-2';

    constructor(private dataService: DataService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getCommissionSetting',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success' && callData.data !== {}) {
                    this.data = callData.data;
                    this.data.myselfRebate *= 100;
                    this.data.linkRebate *= 100;
                    this.data.inviteRebate *= 100;
                    this.data.teamRebate *= 100;
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
        const reg = /^[0-9]+.?[0-9]*$/;
        if (!reg.test(temp.myselfRebate) ||
            !reg.test(temp.linkRebate) ||
            !reg.test(temp.inviteRebate) ||
            !reg.test(temp.teamRebate) ||
            !reg.test(temp.trainFee)) {
            this.toast.warning('请输入数字！');
            return;
        }
        this.dataService.sendRequest({
            action: 'saveCommissionSetting',
            myselfRebate: temp.myselfRebate / 100,
            linkRebate: temp.linkRebate / 100,
            inviteRebate: temp.inviteRebate / 100,
            teamRebate: temp.teamRebate / 100,
            trainFee: temp.trainFee,
            personnelFee: 0,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.toast.success('添加成功！');
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(err => {
            this.toast.error('添加失败！');
        });
    }

}
