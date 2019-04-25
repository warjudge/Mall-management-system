import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../service/dataService';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-monthly-setting',
    templateUrl: './monthly-setting.component.html',
    styleUrls: ['./monthly-setting.component.scss'],
})
export class MonthlySettingComponent implements OnInit {

    data: any;
    icon: any;

    constructor(private router: Router,
                private modalService: NgbModal,
                private dataService: DataService,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getMonthlySetting',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.data = callData.data;
                }
            }
        }).catch(err => {
            this.toast.error('网络错误！');
        });
    }

    refresh() {
        this.ngOnInit();
    }

    onSubmit(e: NgForm) {
        const temp = e.value;
        this.dataService.sendRequest({
            action: 'saveMonthlySetting',
            date: temp.date,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.toast.success('设置成功！');
                }
            }
        }).catch(err => {
            this.toast.error('网络错误！');
        });
    }

}
