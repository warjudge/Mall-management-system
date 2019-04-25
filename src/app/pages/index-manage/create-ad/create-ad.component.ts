import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../service/dataService';
import {NgForm} from '@angular/forms';
import {ImageUpload} from '../../../service/imageUpload';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-create-ad',
    templateUrl: './create-ad.component.html',
    styleUrls: ['./create-ad.component.scss'],
})
export class CreateAdComponent implements OnInit {

    fileList: FileList;
    showFileList: any = [];
    modalHeader: any = '';

    delImg(t) {
        this.showFileList.splice(t.serialNumber, t.serialNumber + 1);
        for (let j = 0; j < this.showFileList.length; j++) {
            this.showFileList[j].serialNumber = j;
        }
    }

    fileChange(event) {
        this.fileList = event.target.files;
        if (this.fileList.length > 0) {
            this.setPreview();
        }
    }

    setPreview() {
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
                    that.showFileList.push({src: dataUrl, w: image.width, h: image.height, name: name});
                    for (let j = 0; j < that.showFileList.length; j++) {
                        that.showFileList[j].serialNumber = j;
                    }
                };
                image.src = dataUrl;
            });
        }
    }

    confirm: any;
    advertPositionIdList: any;
    currentId: any = '';

    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService,
                private toast: ToastrService,
                private imageUpload: ImageUpload) {
    }


    ngOnInit() {
        this.dataService.sendRequest({
            action: 'getAdvertPosList',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.advertPositionIdList = callData.list;
                } else {
                    this.toast.error(callData.msg);
                }
            }
        }).catch(err => {
            this.toast.success('网络错误！');
        });
    }

    closeModal() {
        this.activeModal.close();
    }

    selectAdvertPosition(e) {
        this.currentId = e.target.value;
    }

    onSubmit(f: NgForm) {

        const temp = f.value;
        this.imageUpload.getToken().then(token => {
            this.imageUpload.uploadImage(this.showFileList[0], token)
                .then(res => {
                    const imgList = [];
                    imgList.push(res);
                    const start = this.dataService.parseTime(temp.formpicker1._d);
                    const end = this.dataService.parseTime(temp.formpicker2._d);
                    this.dataService.sendRequest({
                        action: 'addIndexAd',
                        advertPositionId: this.currentId,
                        advertName: temp.advertName,
                        // location: temp.location,
                        start: start,
                        end: end,
                        isEnabled: temp.isEnabled,
                        advertImg: JSON.stringify(imgList),
                        // length: temp.length,
                        // width: temp.width,
                        advertLinkUrl: temp.advertLinkUrl,
                        // seq: temp.seq,
                    }).then(res1 => {
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
        }).catch(() => {
            this.toast.error('网络错误，请重试！');
        });
    }

}
