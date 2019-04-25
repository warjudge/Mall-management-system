import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class DataService implements OnInit {

    // url = 'http://localhost:8080/Gesture';
    // url = 'https://api.blingblingstar.com/Gesture';
    // url0 = 'http://192.168.31.209:8080/Gesture';
    // url = 'http://47.110.133.204:18083/Gesture';
    // url = 'http://192.168.31.142:8080/Gesture';
    url = 'http://47.110.133.204:18083/Gesture';
    url0 = 'https://apitest.wanwudezhi.com/Gesture';
    // url = 'http://192.168.31.157:8080/Gesture';
    // url1 = 'https://47.110.132.246:18080/Gesture';
    url1 = 'https://api.wanwudezhi.com/Gesture';
    url2 = 'https://apitest.wanwudezhi.com/deco';


    sid = '';
    uid = '';
    userName: any = '';
    lastData: any = '';
    lastTime: any = Date.parse(new Date().toString());
    permission: any;
    permissionData: any = {};

    constructor(private httpClient: HttpClient,
                private route: Router,
                private spinner: NgxSpinnerService) {
        const href = location.href;
        if (href.indexOf('localhost') !== -1) {
            this.url = this.url2;
        } else if (href.indexOf('apitest') !== -1) {
            if (href.indexOf('dist1') !== -1)
                this.url = this.url2;
            else if (href.indexOf('dist') !== -1)
                this.url = this.url0;
        } else {
            this.url = this.url1;
        }
    }

    ngOnInit() {

    }

    setPermission(data) {
        this.permission = data;
        sessionStorage.setItem('permission', JSON.stringify(data));
        for (let i = 0; i < this.permission.adminUserAuth.length; i++) {
            const item = this.permission.adminUserAuth[i];
            item.hidden = !(item.add || item.output || item.view || item.search || item.edit || item.delete);
            this.permissionData[item.menu] = item;
        }
        this.route.navigateByUrl('/pages');
    }

    sendRequest(data) {

        if (!this.sid) {
            this.route.navigateByUrl('/');
            return new Promise((resolve, reject) => {
                reject('error');
            });
        }
        return new Promise((resolve, reject) => {
            const temp = {
                sid: this.sid,
                uid: this.uid,
                path: 'BE:ZDBACK',
                data: JSON.stringify({
                    data: data,
                }),
            };
            const urlComplete = this.url + '?json=' + encodeURIComponent(JSON.stringify(temp));
            const tempTime = Date.parse(new Date().toString());
            if (urlComplete === this.lastData && tempTime - this.lastTime < 1000) {

            } else {
                this.spinner.show();
                this.httpClient.get<any>(urlComplete).subscribe(back => {
                    this.hideSpinner();
                    console.log(back);
                    if (back.sessionId) {
                        if (back.sessionId !== this.sid)
                            sessionStorage.setItem('sid', back.sessionId);
                        this.sid = back.sessionId;
                    }
                    if ((back && back['serviceCall'] && back['serviceCall'].serviceId === 'LoginService') ||
                        (back && back['serviceCall'] && back['serviceCall'].serviceId ===
                            'BackgroundUserStarterService')) {
                        if (this.route.url === '/') {
                            resolve({serviceCall: {callData: JSON.stringify({result: 'fail', msg: '用户名或密码错误'})}});
                        } else {
                            this.sid = '';
                            sessionStorage.setItem('sid', '');
                            this.route.navigateByUrl('/');
                            reject('error');
                        }
                    } else {
                        resolve(back);
                    }
                }, error => {
                    this.hideSpinner();
                    reject(error);
                });
            }
        });
    }

    sendPostRequest(data) {
        if (!this.sid) {
            this.route.navigateByUrl('/');
            return new Promise((resolve, reject) => {
                reject('error');
            });
        }
        const temp = {
            sid: this.sid,
            uid: this.uid,
            path: 'BE:ZDBACK',
            data: JSON.stringify({
                data: data,
            }),
        };
        return new Promise((resolve, reject) => {
            this.spinner.show();
            const param = new HttpParams().append('json', JSON.stringify(temp));
            this.httpClient.post(this.url, param)
                .subscribe(
                    (back) => {
                        this.hideSpinner();
                        console.log(back);
                        if (back['sessionId']) {
                            if (back['sessionId'] !== this.sid)
                                sessionStorage.setItem('sid', back['sessionId']);
                            this.sid = back['sessionId'];
                        }
                        if ((back && back['serviceCall'] && back['serviceCall'].serviceId === 'LoginService') ||
                            (back && back['serviceCall'] &&
                                back['serviceCall'].serviceId === 'BackgroundUserStarterService')) {
                            this.sid = '';
                            sessionStorage.setItem('sid', '');
                            this.route.navigateByUrl('/');
                            reject('error');
                        }
                        resolve(back);
                    },
                    response => {
                        this.hideSpinner();
                        reject(response);
                    },
                    () => {
                    });
        });
    }

    hideSpinner() {
        // setTimeout(() => {
        //     this.spinner.hide();
        // }, 0);
        this.spinner.hide();
    }

    showSpinner() {
        this.spinner.show();
    }

    downfile(data) {
        const temp = {
            sid: this.sid,
            uid: this.uid,
            path: 'BE:ZDBACK',
            data: JSON.stringify({
                data: data,
            }),
        };
        location.href = this.url + '?json=' + encodeURIComponent(JSON.stringify(temp));
    }

    sendRequestWithOutData() {
        return new Promise((resolve, reject) => {
            const temp = {
                sid: this.sid,
                uid: this.uid,
                path: 'BE:ZDBACK',
            };
            const urlComplete = this.url + '?json=' + encodeURIComponent(JSON.stringify(temp));
            this.spinner.show();
            this.httpClient.get<any>(urlComplete).subscribe(back => {
                this.hideSpinner();
                if (back.sessionId) {
                    if (back.sessionId !== this.sid)
                        sessionStorage.setItem('sid', back.sessionId);
                    this.sid = back.sessionId;
                }
                resolve(back);
            }, error => {
                this.hideSpinner();
                reject(error);
            });
        });
    }

    getCallData(data) {
        if (data.serviceCall && data.serviceCall.callData) {
            return JSON.parse(data.serviceCall.callData);
        } else {
            return null;
        }
    }

    readBlobAsDataURL(blob, callback) {
        const reader = new FileReader();
        const that = this;
        reader.onload = function (e) {
            // @ts-ignore
            callback(e.currentTarget.result);
        };
        reader.readAsDataURL(blob);
    }


    parseTime(d: any) {

        const newDate = d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1))
            + '-' + (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()) + ' '
            + (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':'
            + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ':'
            + (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
        return newDate;
    }

    timeStamp2formDta(ts) {
        const d = new Date(ts);
        return this.parseTime(d);
    }


    checkInteger(temp) {
        const r = /^\+?[1-9][0-9]*$/;
        return r.test(temp);
    }

    checkNumber(temp) {
        const r = /^\d+(\.{0,1}\d+){0,1}$/;
        return r.test(temp);
    }

    replaceAllBlank(data) {
        return JSON.parse(JSON.stringify(data).replace(/\s+/g, ''));
    }

    replaceStringBlank(data) {
        return data.replace(/\s+/g, '');
    }

    checkPhone(number) {
        return /^1[34578]\d{9}$/.test(number);
    }

    checkBankcardCode(BankNo) {
        const pattern = /^([1-9]{1})(\d{15}|\d{18})$/;
        return pattern.test(BankNo);
    }

    trimStr(str) {
        return ('' + str).replace(/(^\s*)|(\s*$)/g, '');
    }


}