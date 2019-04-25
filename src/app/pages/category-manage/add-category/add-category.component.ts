import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../service/dataService';
import {NgForm} from '@angular/forms';
import {ImageUpload} from '../../../service/imageUpload';
import {ToastrService} from 'ngx-toastr';


@Component({
    selector: 'ngx-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {

    fileList: FileList;
    showFileList: any = [];
    modalHeader: any;
    confirm: any;

    parentId: any = '';
    item: any = '';
    isMain: boolean = false;

    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService,
                private toastrService: ToastrService,
                private imageUpload: ImageUpload) {

    }

    closeModal() {
        this.confirm = 'cancel';
        this.activeModal.close(this.confirm);
    }

    ngOnInit() {
        if (this.item && this.item.categoryIconUrl)
            this.showFileList.push({src: this.item.categoryIconUrl});
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

    delImg(t) {
        this.showFileList.splice(t.serialNumber, t.serialNumber + 1);
        for (let j = 0; j < this.showFileList.length; j++) {
            this.showFileList[j].serialNumber = j;
        }
    }

    cancel() {
        this.closeModal();
    }

    onSubmit(e: NgForm) {
        const temp = e.value;
        if (!temp.name) {
            this.toastrService.warning('请输入后台类目名称');
            return;
        }
        // if (!temp.frontName) {
        //     this.toastrService.warning('请输入前台类目名称');
        //     return;
        // }
        if (!temp.code) {
            this.toastrService.warning('请输入类目编码');
            return;
        }
        if (this.showFileList.length === 0) {
            this.toastrService.warning('请添加类目图片');
            return;
        }
        if (this.parentId) {
            this.imageUpload.getToken().then(token => {
                this.imageUpload.uploadImage(this.showFileList[0], token)
                    .then(res => {
                        const imgList = [];
                        imgList.push(res);
                        temp.recommend = temp.recommend ? 'true' : 'false';
                        this.dataService.sendRequest({
                            action: 'addCategory',
                            parentId: this.parentId,
                            categoryName: temp.name,
                            frontName: temp.frontName,
                            categoryCode: temp.code,
                            categoryIcon: JSON.stringify(imgList),
                            recommend: temp.recommend,
                        }).then(res1 => {
                            if (res1['serviceCall']) {
                                const callData = this.dataService.getCallData(res1);
                                if (callData.result === 'success') {
                                    this.toastrService.success('添加成功！');
                                    this.confirm = 'success';
                                    this.activeModal.close(this.confirm);
                                } else {
                                    this.toastrService.error(callData.msg);
                                }
                            }
                        }).catch(err => {
                            this.toastrService.error('网络错误，请重试！');
                        });
                    }).catch(err => {
                    this.toastrService.error('图片上传错误，请重试！');
                });
            }).catch(() => {
            });

        } else if (this.item) {
            if (this.showFileList[0].w) {
                this.imageUpload.getToken().then(token => {
                    this.imageUpload.uploadImage(this.showFileList[0], token)
                        .then(res => {
                            const imgList = [];
                            imgList.push(res);
                            this.dataService.sendRequest({
                                action: 'editCategory',
                                id: this.item.id,
                                categoryName: temp.name,
                                frontName: temp.frontName,
                                categoryCode: temp.code,
                                categoryIcon: JSON.stringify(imgList),
                                recommend: '' + temp.recommend,
                            }).then(res1 => {
                                if (res1['serviceCall']) {
                                    const callData = this.dataService.getCallData(res1);
                                    if (callData.result === 'success') {
                                        this.toastrService.success('编辑成功！');
                                        this.confirm = 'success';
                                        this.activeModal.close(this.confirm);
                                    } else {
                                        this.toastrService.error(callData.msg);
                                    }
                                }
                            }).catch(err => {
                                this.toastrService.error('网络错误，请重试！');

                            });
                        }).catch(() => {
                        this.toastrService.error('图片上传错误，请重试！');
                    });
                }).catch(() => {
                });
            } else {
                this.dataService.sendRequest({
                    action: 'editCategory',
                    id: this.item.id,
                    categoryName: temp.name,
                    frontName: temp.frontName,
                    categoryCode: temp.code,
                    recommend: '' + temp.recommend,
                }).then(res => {
                    if (res['serviceCall']) {
                        const callData = this.dataService.getCallData(res);
                        if (callData.result === 'success') {
                            this.toastrService.success('编辑成功！');
                            this.confirm = 'success';
                            this.activeModal.close(this.confirm);
                        } else {
                            this.toastrService.error(callData.msg);
                        }
                    }
                }).catch(err => {
                    this.toastrService.error('网络错误，请重试！');
                });
            }
        }

    }
}
