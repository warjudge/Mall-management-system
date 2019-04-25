import {Component, OnInit} from '@angular/core';
import {DataService} from '../../service/dataService';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {


    data1: any = 0;
    data2: any = 0;
    data3: any = 0;

    constructor(private dataService: DataService,
                private toast: ToastrService) {
    }


    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getDiffOrderNum',
            status: 'NOTSEND',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.data1 = callData.data;
                }
            }
        }).catch(() => {
            this.toast.error('网络错误');
        });
        this.dataService.sendRequest({
            action: 'getDiffOrderNum',
            status: 'DELIVERY',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.data2 = callData.data;
                }
            }
        }).catch(() => {
            this.toast.error('网络错误');
        });
        this.dataService.sendRequest({
            action: 'getDiffOrderNum',
            status: 'AGREERETURN',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.data3 = callData.data;
                }
            }
        }).catch(() => {
            this.toast.error('网络错误');
        });
    }

}
