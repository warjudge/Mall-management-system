import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {DataService} from '../../../service/dataService';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-member-benefits-setting',
    templateUrl: './member-benefits-setting.component.html',
    styleUrls: ['./member-benefits-setting.component.scss'],
})
export class MemberBenefitsSettingComponent implements OnInit {

    data: any;
    icon: any = 'flip-2';

    constructor(private dataService: DataService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getMemberBenefitsSetting',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
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
        const reg = /^[0-9]+.?[0-9]*$/;
        if (!reg.test(temp.memberDiscount) ||
            !reg.test(temp.partnerDiscount)) {
            this.toast.warning('请输入数字！');
            return;
        }
        this.dataService.sendRequest({
            action: 'saveMemberBenefitsSetting',
            memberDiscount: temp.memberDiscount,
            partnerDiscount: temp.partnerDiscount,
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
            this.toast.error('网络错误！');
        });
    }

}
