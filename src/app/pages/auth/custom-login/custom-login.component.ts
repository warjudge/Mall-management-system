import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {DataService} from '../../../service/dataService';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-custom-login',
    templateUrl: './custom-login.component.html',
    styleUrls: ['./custom-login.component.scss'],
})
export class CustomLoginComponent implements OnInit {


    constructor(private dataService: DataService,
                private router: Router,
                private toast: ToastrService) {
    }

    ngOnInit() {
        this.dataService.userName = '';
        if (!this.dataService.sid) {
            this.dataService.sendRequestWithOutData().then(res => {
                if (res['serviceCall']) {
                    this.dataService.sid = res['sessionId'];
                } else {
                    this.toast.error('系统错误！');
                }
            }).catch(err => {
                this.toast.error('网络错误！');
            });
        }
    }

    onSubmit(e: NgForm) {
        if (e.value.userName && e.value.password) {
            this.dataService.sendRequest({
                action: 'loginService',
                userName: e.value.userName,
                password: e.value.password,
            }).then(res => {
                if (res['serviceCall']) {
                    const callData = this.dataService.getCallData(res);
                    if (callData.result === 'success') {
                        sessionStorage.setItem('userName', e.value.userName);

                        this.dataService.sendRequest({
                            action: 'getSystemUserDetail',
                            username: e.value.userName,
                        }).then(res1 => {
                            if (res1['serviceCall']) {
                                const callData1 = this.dataService.getCallData(res1);
                                if (callData1.result === 'success') {
                                    this.dataService.setPermission(callData1.data);
                                }
                            }
                        }).catch(err => {
                            this.toast.error('网络错误！');
                        });

                    } else {
                        this.toast.error('用户名或密码错误！');
                    }
                }
            }).catch(() => {
                this.toast.error('网络错误！');
            });
        }
    }

}
