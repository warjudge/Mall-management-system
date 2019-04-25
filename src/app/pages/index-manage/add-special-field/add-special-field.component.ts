import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../service/dataService';
import {ImageUpload} from '../../../service/imageUpload';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-add-special-field',
    templateUrl: './add-special-field.component.html',
    styleUrls: ['./add-special-field.component.scss'],
})
export class AddSpecialFieldComponent implements OnInit {

    fileList: FileList;
    modalHeader: any = '';
    rowData: any;
    isEdit: any = false;
    entrance: any = [{
        id: 'showImgs',
        showFileList: [],
    }];
    commodityData: any = null;

    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService,
                private toast: ToastrService,
                private imageUpload: ImageUpload) {
    }

    closeModal() {
        this.activeModal.close();
    }

    cancel() {
        this.activeModal.close('cancel');
    }

    ngOnInit() {
        if (this.rowData) {
            this.rowData.start = this.dataService.timeStamp2formDta(this.rowData.start);
            this.rowData.end = this.dataService.timeStamp2formDta(this.rowData.end);
            if (this.rowData.showImgs)
                this.entrance[0].showFileList.push({
                    src: this.rowData.showImgs,
                    w: '',
                    h: '',
                    url: this.rowData.showImgs,
                });
            this.updateGoods(this.rowData.goodsId);
            // this.dataService.sendRequest({
            //     action: 'getSpecialFieldDetail',
            //     id: this.rowData.id,
            // }).then(res => {
            //     if (res['serviceCall']) {
            //         const callData = this.dataService.getCallData(res);
            //         if (callData.result === 'success') {
            //             this.rowData = callData.data;
            //         } else {
            //             this.toast.error(callData.msg);
            //         }
            //     }
            // }).catch(() => {
            //     this.toast.error('网络错误');
            // });
        }
    }

    goodsChange(e) {
        if (e.target.value) {
            this.updateGoods(e.target.value);
        }
    }

    updateGoods(id) {
        this.dataService.sendRequest({
            action: 'getCommodityDetail',
            id: id,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.commodityData = callData.data;
                } else {
                    this.commodityData = null;
                }
            } else {
                this.commodityData = null;
            }
        }).catch(() => {
            this.commodityData = null;
            this.toast.error('网络错误！');
        });
    }

    onSubmit(e) {
        const temp = e.value;
        if (!temp.goodsId) {
            this.toast.error('请输入链接商品编号！');
            return;
        }
        if (!temp.start) {
            this.toast.error('请输入启用开始时间！');
            return;
        }
        if (!temp.end) {
            this.toast.error('请输入启用结束时间！');
            return;
        }
        if (!temp.state) {
            this.toast.error('请选择启用状态！');
            return;
        }
        if (!this.commodityData) {
            this.toast.error('请输入正确的链接商品编号！');
            return;
        }
        const sendData = {};
        sendData['goodsId'] = temp.goodsId;
        sendData['start'] = temp.start._d ? this.dataService.parseTime(temp.start._d) :
            this.dataService.timeStamp2formDta(temp.start);
        sendData['end'] = temp.end._d ? this.dataService.parseTime(temp.end._d) :
            this.dataService.timeStamp2formDta(temp.end);
        sendData['state'] = temp.state === '开启' ? '1' : '0';
        if (this.rowData) {
            // if (this.entrance[0].showFileList.length !== 0) {
            //     if (this.entrance[0].showFileList[0].w) {
            this.imageUpload.uploadEntrance(this.entrance, sendData).then(data => {
                data['action'] = 'updateSpecialGoodsById';
                sendData['goodsSpecialId'] = this.rowData.specialGoodsId;
                this.dataService.sendRequest(data).then(res => {
                    if (res['serviceCall']) {
                        const callData = this.dataService.getCallData(res);
                        if (callData.result === 'success') {
                            this.toast.success('修改成功');
                            this.activeModal.close('success');
                        } else {
                            this.toast.error(callData.msg);
                        }
                    }
                }).catch(() => {
                    this.toast.error('网络错误');
                });
            }).catch(() => {
                this.toast.error('图片上传失败，请重试！');
            });
            // } else {
            //     sendData['action'] = 'updateSpecialGoodsById';
            //     sendData['goodsSpecialId'] = this.rowData.specialGoodsId;
            //     this.dataService.sendRequest(sendData).then(res => {
            //         if (res['serviceCall']) {
            //             const callData = this.dataService.getCallData(res);
            //             if (callData.result === 'success') {
            //                 this.toast.success('修改成功');
            //                 this.activeModal.close('success');
            //             } else {
            //                 this.toast.error(callData.msg);
            //             }
            //         }
            //     }).catch(() => {
            //         this.toast.error('网络错误');
            //     });
            // }
            // }
        } else {
            // if (this.entrance[0].showFileList.length !== 0) {
            this.imageUpload.uploadEntrance(this.entrance, sendData).then(data => {
                data['action'] = 'addSpecialGoods';
                this.dataService.sendRequest(data).then(res => {
                    if (res['serviceCall']) {
                        const callData = this.dataService.getCallData(res);
                        if (callData.result === 'success') {
                            this.toast.success('添加成功');
                            this.activeModal.close('success');
                        } else {
                            this.toast.error(callData.msg);
                        }
                    }
                }).catch(() => {
                    this.toast.error('网络错误');
                });
            }).catch(() => {
                this.toast.error('图片上传失败，请重试！');
            });
            // } else {
            //     sendData['action'] = 'addSpecialGoods';
            //     this.dataService.sendRequest(sendData).then(res => {
            //         if (res['serviceCall']) {
            //             const callData = this.dataService.getCallData(res);
            //             if (callData.result === 'success') {
            //                 this.toast.success('添加成功');
            //                 this.activeModal.close('success');
            //             } else {
            //                 this.toast.error(callData.msg);
            //             }
            //         }
            //     }).catch(() => {
            //         this.toast.error('网络错误');
            //     });
            // }
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
