import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../../service/dataService';
import {ClipboardService} from 'ngx-clipboard';
import {ImageUpload} from '../../../../service/imageUpload';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-activity-commodity-list-modal',
    templateUrl: './activity-commodity-list-modal.component.html',
    styleUrls: ['./activity-commodity-list-modal.component.scss'],
})
export class ActivityCommodityListModalComponent implements OnInit {

    fileList: FileList;
    modalHeader: any = '';
    rowData: any;
    activityData: any;
    isEdit: boolean = false;
    list: any = [];
    item: any = {
        id: '',
        entrance: [{
            id: 'activityShowImg',
            showFileList: [],
        }],
        commodity: null,
    };

    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService,
                private clip: ClipboardService,
                private toast: ToastrService,
                private imageUpload: ImageUpload) {
    }

    closeModal() {
        this.activeModal.close();
    }


    ngOnInit() {
        if (this.rowData) {
            this.list.push({
                id: this.rowData.activityGoodsId,
                entrance: [{
                    id: 'activityGoodsImg',
                    showFileList: [
                        {src: this.rowData.activityGoodsImg? this.rowData.activityGoodsImg : ''}
                    ]
                }],
                commodity: null,
            });
            this.updateGoods(this.rowData.activityGoodsId, this.rowData.activityId, 0);
        }
    }

    onSubmit() {
        const temp = [];
        this.list.forEach(item => {
            if (item.id) {
                temp.push(item);
            }
        });
        const sendData = [];
        let i = 0;
        const upload = (item) => {
            const t = {goodsId: item.id};
            if (item.entrance[0].showFileList.length > 0) {
                this.imageUpload.uploadEntrance(item.entrance, item).then(data => {
                    t['activityGoodsImg'] = data['activityGoodsImg'];
                    sendData.push(t);
                    i = i + 1;
                    if (temp[i]) {
                        upload(temp[i]);
                    } else {
                        this.submit(sendData);
                    }
                }).catch(() => {
                    this.toast.error(item.id + '图片上传失败，请重试!');
                    return;
                });
            } else {
                sendData.push(t);
                i = i + 1;
                if (temp[i]) {
                    upload(temp[i]);
                } else {
                    this.submit(sendData);
                }
            }
        };
        if (temp && temp[i]) {
            upload(temp[i]);
        }
    }

    submit(data) {
        const sendData = {};

        sendData['commodities'] = JSON.stringify(data);
        if (this.rowData && this.rowData.activityId) {
            sendData['activityId'] = this.rowData.activityId;
            sendData['action'] = 'updateActivityGoods';
            sendData['activityGoodsId'] = this.rowData.activityGoodsId;
            sendData['goodsId'] = this.rowData.goodsId;
        } else {
            sendData['activityId'] = this.activityData.id;
            sendData['action'] = 'addActivityGoodsByList';
        }
        this.dataService.sendRequest(sendData).then(res => {
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
    }

    addCommodity() {
        this.list.push({
            id: '',
            entrance: [{
                id: 'activityGoodsImg',
                showFileList: [],
            }],
            commodity: null,
        });
    }

    delCommodity(item, index) {
        this.list.splice(index, 1);
    }

    updateCommodity(index) {
        return;
        if (this.list.length > index && this.list[index].id) {
            this.updateGoods(this.list[index].id, this.rowData.activityId, index);
        }
    }

    updateGoods(activityGoodsId, activityId, index) {
        this.dataService.sendRequest({
            action: 'getActivityGoodsDetail',
            activityId: activityId,
            activityGoodsId: activityGoodsId,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                console.log(callData);
                if (callData.result === 'success') {
                    if (callData.data && callData.data.goodsAuthority !== 1) {
                        if (this.list.length > index) {
                            this.list[index].commodity = callData.data;
                        } else {
                            this.list[index].commodity = null;
                        }
                    } else {
                        this.toast.warning('会员商品无法添加到活动中');
                    }
                } else {
                    this.list[index].commodity = null;
                }
            } else {
                this.list[index].commodity = null;
            }
        }).catch(() => {
            this.list[index].commodity = null;
            this.toast.error('网络错误！');
        });
    }

    copyUrl() {
        if (this.activityData.activityUrl) {
            this.clip.copyFromContent(this.activityData.activityUrl);
            this.toast.success('复制成功');
        }
    }

    cancel() {
        this.activeModal.close('cancel');
    }

    delImg(index) {
        this.list[index].entrance[0].showFileList = [];
    }

    fileChange(event, ent, index) {
        if (this.list.length > index) {
            this.fileList = null;
            this.fileList = event.target.files;
            event.target.files = null;
            if (this.fileList.length > 0) {
                this.setPreview(index);
            }
        }
    }


    setPreview(index) {
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
                    that.list[index].entrance[0].showFileList.push({
                        src: dataUrl,
                        w: image.width,
                        h: image.height,
                        name: name,
                    });
                };
                image.src = dataUrl;
            });
        }
    }

}
