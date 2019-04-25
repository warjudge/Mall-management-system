import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../service/dataService';
import {ImageUpload} from '../../../service/imageUpload';
import {ClipboardService} from 'ngx-clipboard';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-create-activity',
    templateUrl: './create-activity.component.html',
    styleUrls: ['./create-activity.component.scss'],
})
export class CreateActivityComponent implements OnInit {

    fileList: FileList;
    modalHeader: any = '';
    isEdit: boolean = false;
    rowData: any;
    entrance: any = [{
        id: 'activityShowImg',
        showFileList: [],
    }];


    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService,
                private toast: ToastrService,
                private imageUpload: ImageUpload,
                private clip: ClipboardService) {
    }

    closeModal() {
        this.activeModal.close();
    }

    ngOnInit() {
        if (this.rowData) {
            this.rowData.start = this.dataService.timeStamp2formDta(this.rowData.start);
            this.rowData.end = this.dataService.timeStamp2formDta(this.rowData.end);
            this.entrance[0].showFileList.push({src: this.rowData.activityShowImg, w: '', h: ''});
        }
    }


    onSubmit(e) {
        const temp = e.value;
        if (!temp.activityName) {
            this.toast.error('请输入活动标题！');
            return;
        }
        if (!temp.start) {
            this.toast.error('请输入开始时间！');
            return;
        }
        if (!temp.end) {
            this.toast.error('请输入关闭时间！');
            return;
        }
        if (!temp.isEnabled) {
            this.toast.error('请选择启用状态！');
            return;
        }
        if (this.entrance[0].showFileList.length === 0) {
            this.toast.error('请添加活动图片！');
            return;
        }
        const sendData = {};
        sendData['activityName'] = temp.activityName;
        sendData['start'] = temp.start._d ? this.dataService.parseTime(temp.start._d) :
            this.dataService.timeStamp2formDta(temp.start);
        sendData['end'] = temp.end._d ? this.dataService.parseTime(temp.end._d) :
            this.dataService.timeStamp2formDta(temp.end);
        sendData['isEnabled'] = temp.isEnabled === '开启' ? '1' : '0';
        if (this.rowData) {
            sendData['action'] = 'updateActivity';
            sendData['activityId'] = this.rowData.id;
            if (this.entrance[0].showFileList[0].w) {
                this.imageUpload.uploadEntrance(this.entrance, sendData).then(data => {
                    this.dataService.sendRequest(data).then(res => {
                        if (res['serviceCall']) {
                            const callData = this.dataService.getCallData(res);
                            if (callData.result === 'success') {
                                this.toast.success('保存成功');
                                this.activeModal.close('success');
                            }
                        }
                    }).catch(() => {
                        this.toast.error('网络错误');
                    });
                }).catch(() => {
                    this.toast.error('图片上传失败，请重试！');
                });
            } else {
                this.dataService.sendRequest(sendData).then(res => {
                    if (res['serviceCall']) {
                        const callData = this.dataService.getCallData(res);
                        if (callData.result === 'success') {
                            this.toast.success('保存成功');
                            this.activeModal.close('success');
                        }
                    }
                }).catch(() => {
                    this.toast.error('网络错误');
                });
            }

        } else {
            this.imageUpload.uploadEntrance(this.entrance, sendData).then(data => {
                data['action'] = 'addActivity';
                this.dataService.sendRequest(data).then(res => {
                    if (res['serviceCall']) {
                        const callData = this.dataService.getCallData(res);
                        if (callData.result === 'success') {
                            this.toast.success('添加成功');
                            this.activeModal.close('success');
                        }
                    }
                }).catch(() => {
                    this.toast.error('网络错误');
                });
            }).catch(() => {
                this.toast.error('图片上传失败，请重试！');
            });
        }

    }

    copyUrl() {
        if (this.rowData.activityUrl) {
            this.clip.copyFromContent(this.rowData.activityUrl);
            this.toast.success('复制成功');
        }
    }

    delImg(t, ent) {
        this.entrance.forEach(item => {
            if (item.id === ent) {
                item.showFileList = [];
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
