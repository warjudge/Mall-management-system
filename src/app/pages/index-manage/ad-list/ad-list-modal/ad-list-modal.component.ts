import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../../service/dataService';
import {NgForm} from '@angular/forms';
import {ImageUpload} from '../../../../service/imageUpload';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-ad-list-modal',
    templateUrl: './ad-list-modal.component.html',
    styleUrls: ['./ad-list-modal.component.scss'],
})
export class AdListModalComponent implements OnInit {

    fileList: FileList;
    showFileList: any = [];
    entrance: any = [{
        id: 'advertImgUrl',
        showFileList: [],
    }];

    isEdit: any = false;
    data: any;
    adData: any;
    positionData: any;
    modalHeader: any = '';

    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService,
                private toast: ToastrService,
                private imageUpload: ImageUpload) {
    }


    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getIndexAdDetail',
            advertId: this.data.id,
            advertPositionId: this.data.advertPositionId,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.adData = callData.advert;
                    this.positionData = callData.advertPosition;
                    if (this.adData.advertImgUrl) {
                        this.entrance[0].showFileList.push({
                            src: this.adData.advertImgUrl,
                            w: 0,
                            h: 0,
                            name: '',
                            url: this.adData.advertImgUrl,
                        });
                    }
                    this.adData.start = this.adData.start ? this.dataService.timeStamp2formDta(this.adData.start) : '';
                    this.adData.end = this.adData.end ? this.dataService.timeStamp2formDta(this.adData.end) : '';
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

    goToEdit() {
        this.isEdit = true;
    }

    onSubmit(f: NgForm) {
        const temp = f.value;
        if (!temp.advertName) {
            this.toast.warning('请输入广告标题');
            return;
        }
        if (!temp.advertLinkUrl) {
            this.toast.warning('请输入跳转链接');
            return;
        }
        if (!temp.formpicker1) {
            this.toast.warning('请选择开始时间');
            return;
        }
        if (!temp.formpicker2) {
            this.toast.warning('请选择关闭时间');
            return;
        }
        if (temp.isEnabled !== '0' && temp.isEnabled !== '1') {
            this.toast.warning('请选择启用状态');
            return;
        }
        const sendData = {};
        this.imageUpload.uploadEntrance(this.entrance, sendData).then(res => {
            const start = temp.formpicker1._d ? this.dataService.parseTime(temp.formpicker1._d) : temp.formpicker1;
            const end = temp.formpicker2._d ? this.dataService.parseTime(temp.formpicker2._d) : temp.formpicker2;
            res['action'] = 'editIndexAd';
            res['advertId'] = this.adData.id;
            res['advertLinkUrl'] = temp.advertLinkUrl;
            res['advertPositionId'] = this.positionData.id;
            res['advertName'] = temp.advertName;
            res['start'] = start;
            res['end'] = end;
            res['isEnabled'] = temp.isEnabled;
            this.dataService.sendRequest(res).then(res1 => {
                if (res1['serviceCall']) {
                    const callData = this.dataService.getCallData(res1);
                    if (callData.result === 'success') {
                        this.toast.success('保存成功！');
                        this.activeModal.close('success');
                    } else {
                        this.toast.error(callData.msg);
                    }
                }
            }).catch(err => {
                this.toast.error('网络错误，请重试！');
            });
        }).catch(err => {
            this.toast.error('图片上传错误，请重试！');
        });
    }

    delImg(t, ent) {
        this.entrance.forEach(item => {
            if (item.id === ent) {
                item.showFileList.splice(t.serialNumber, 1);
                for (let j = 0; j < item.showFileList.length; j++) {
                    item.showFileList[j].serialNumber = j;
                }
            }
        });
    }


    fileChange(event, ent) {
        this.entrance.forEach(item => {
            if (item.id === ent) {
                this.fileList = null;
                this.fileList = event.target.files;
                event.target.files = null;
                if (this.fileList.length > 0) {
                    this.setPreview(ent);
                }
            }
        });
    }


    setPreview(ent) {
        this.entrance.forEach(item => {
            if (item.id === ent) {
                for (let i = 0; i < this.fileList.length; i++) {
                    if (!(this.fileList[i].type === 'image/jpeg' || this.fileList[i].type === 'image/png' || this.fileList[i].type === 'image/gif')) {
                        this.fileList[i] = null;
                        continue;
                    }
                    const that = this;
                    this.dataService.readBlobAsDataURL(this.fileList[i], function (dataUrl) {
                        const image = new Image();
                        const name = that.fileList[i].name;
                        image.onload = function () {
                            item.showFileList.push({src: dataUrl, w: image.width, h: image.height, name: name});
                            for (let j = 0; j < item.showFileList.length; j++) {
                                item.showFileList[j].serialNumber = j;
                            }
                        };
                        image.src = dataUrl;
                    });
                }
            }
        });
    }

}
