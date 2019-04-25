import {Injectable} from '@angular/core';
import {DataService} from './dataService';
import {NgxSpinnerService} from 'ngx-spinner';

declare let qiniu;

@Injectable()
export class ImageUpload {
    constructor(private dataService: DataService,
                private spinner: NgxSpinnerService) {

    }

    checkResult(entrance, res) {
        return new Promise((resolve, reject) => {
            let canBack = false;
            for (let l = 0; l < entrance.length; l++) {
                const tempid = entrance[l].id;
                if (res[tempid] && JSON.parse(res[tempid]).length === entrance[l].showFileList.length) {
                    canBack = true;
                } else {
                    canBack = false;
                    break;
                }
            }
            if (canBack === true) {
                resolve('true');
            } else {
                resolve('false');
            }
        });
    }

    // entrance = [{
    //     id: '';
    // uploadToken: '',
    // showFileList: []
    // }]


    uploadEntrance(entrance, res) {
        return new Promise((resolve, reject) => {
            this.getToken().then(token => {
                let i = 0;
                entrance.forEach(en => {
                    en.uploadToken = token;
                });
                const upload = (item) => {
                    this.spinner.show();
                    this.getUploadResult(item).then(su => {
                        res[entrance[i].id] = JSON.stringify(su);
                        i = i + 1;
                        if (entrance[i]) {
                            upload(entrance[i]);
                        } else {
                            this.checkResult(entrance, res).then(check => {
                                if (check === 'true') {
                                    this.spinner.hide();
                                    resolve(res);
                                } else {
                                    this.spinner.hide();
                                    reject('error');
                                }
                            }).catch(err => {
                                console.log(err);
                            });
                        }
                    }).catch(err => {
                        this.spinner.hide();
                        reject('error');
                    });
                };
                if (entrance[i]) {
                    upload(entrance[i]);
                }
            }).catch(() => {
                this.spinner.hide();
                reject('error');
            });
        });
    }

    getToken() {
        return new Promise((resolve, reject) => {
            this.spinner.show();
            this.dataService.sendRequest({
                action: 'getQiNiuToken',
            }).then(result => {
                if (result['serviceCall']) {
                    const token = this.dataService.getCallData(result).data;
                    resolve(token);
                }
            }).catch(() => {
                reject('err');
            });
        });
    }

    getUploadResult(item) {
        return new Promise((resolve, reject) => {
            const resultDataArray = [];
            let i = 0;
            const upload = (temp) => {
                this.uploadImage(temp, item.uploadToken).then(res => {
                    // @ts-ignore
                    res.id = item.id;
                    resultDataArray.push(res);
                    i = i + 1;
                    if (item.showFileList[i]) {
                        upload(item.showFileList[i]);
                    } else {
                        resolve(resultDataArray);
                    }
                }).catch(err => {
                    reject('error');
                    return;
                });
            };
            if (item.showFileList[i]) {
                upload(item.showFileList[i]);
            } else {
                resolve([]);
            }
        });
    }

    uploadImage(item, uploadToken) {
        return new Promise((resolve, reject) => {
            const resultData = {
                id: '',
                status: '',
                type: '',
                url: '',
                size: 0,
                width: 0,
                height: 0,
                length: 0,
                systemName: '',
                externalName: '',
            };
            const observer = {
                next() {

                },
                error() {
                    resultData.status = 'error';
                    reject(resultData);
                },
                complete(res) {
                    resultData.status = 'success';
                    resolve(resultData);
                },
            };
            const config = {
                useCdnDomain: false,
                region: null,
            };
            if (!item.url) {
                const putExtra = {};
                const blob = this.convertBase64ToBlob(item.src);
                resultData.type = blob.type ? blob.type : 'image/png';
                if (blob.type) {
                    const right = '.' + blob.type.split('/')[1];
                    resultData.externalName = item.name ? item.name : this.dataService.sid +
                        this.getNowFormatDate() + this.getrandom() + right;
                    resultData.systemName = this.dataService.sid + this.getNowFormatDate() + this.getrandom() + right;
                } else {
                    resultData.externalName = item.name ? item.name : this.dataService.sid +
                        this.getNowFormatDate() + this.getrandom() + '.png';
                    resultData.systemName = this.dataService.sid + this.getNowFormatDate() + this.getrandom() + '.png';
                }
                resultData.width = item.w;
                resultData.height = item.h;
                const observable = qiniu.upload(blob, resultData.systemName, uploadToken, putExtra, config);
                observable.subscribe(observer);
            } else {
                resultData.status = 'success';
                if (item.systemName) {
                    resultData.systemName = item.systemName;
                    resultData.type = item.type;
                    resultData.externalName = item.externalName;
                    resultData.width = item.width;
                    resultData.height = item.height;
                    resolve(resultData);
                } else {
                    if (item.src.indexOf('?') !== -1) {
                        item.src = item.src.split('?')[0];
                    }
                    if (item.src.indexOf('wanwudezhi.com/') !== -1)
                        item.src = item.src.split('wanwudezhi.com/')[1];
                    resultData.systemName = item.src;
                    if (item.src.indexOf('.jpg') !== -1 || item.src.indexOf('.jpeg') !== -1) {
                        resultData.type = 'image/png';
                    }
                    if (item.src.indexOf('.png') !== -1) {
                        resultData.type = 'image/png';
                    }
                    if (item.src.indexOf('.gif') !== -1) {
                        resultData.type = 'image/gif';
                    }
                    resultData.externalName = item.src;
                    resultData.width = 0;
                    resultData.height = 0;
                    resolve(resultData);
                }
            }

        });
    }

    getNowFormatDate() {
        const date = new Date();
        let month = (date.getMonth() + 1).toString();
        let strDate = (date.getDate()).toString();
        // @ts-ignore
        if (parseInt(month) >= 1 && parseInt(month) <= 9) {
            month = '0' + month;
        }
        if (parseInt(strDate) >= 0 && parseInt(strDate) <= 9) {
            strDate = '0' + strDate;
        }
        return date.getFullYear() + month + strDate
            + date.getHours() + date.getMinutes()
            + date.getSeconds();
    }

    getrandom() {
        return Math.floor(Math.random() * (100000 - 1) + 1);
    }


    convertBase64ToBlob(base64) {
        const base64Arr = base64.split(',');
        let imgtype = '';
        let base64String = '';
        if (base64Arr.length > 1) {
            base64String = base64Arr[1];
            imgtype = base64Arr[0].substring(base64Arr[0].indexOf(':') + 1, base64Arr[0].indexOf(';'));
        }
        const bytes = atob(base64String);
        const bytesCode = new ArrayBuffer(bytes.length);
        const byteArray = new Uint8Array(bytesCode);
        for (let i = 0; i < bytes.length; i++) {
            byteArray[i] = bytes.charCodeAt(i);
        }
        return new Blob([bytesCode], {type: imgtype});
    }


    compress(sourceImg, scale, quality) {
        const area = sourceImg.width * sourceImg.height, // 源图片的总大小
            height = sourceImg.height * scale,
            width = sourceImg.width * scale,
            compressCvs = document.createElement('canvas'); // 压缩的图片画布
        // 压缩的图片配置宽高
        compressCvs.width = width;
        compressCvs.height = height;
        const compressCtx = compressCvs.getContext('2d');
        // 解决ios 图片大于2000000像素无法用drawImage的bug
        if (area > 2000000 && navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            // 瓦片绘制
            const smallCvs = document.createElement('canvas'),
                smallCtx = smallCvs.getContext('2d'),
                count = Math.ceil(area / 1000000), // 分割的数量
                cvsWidth = width / count, // 每个小canvas的宽度
                picWidth = sourceImg.width / count; // 分割成小图片的宽度
            smallCvs.height = compressCvs.height;
            smallCvs.width = width / count;
            // 拼凑成大的canvas
            for (let i = 0; i < count; i++) {
                smallCtx.drawImage(sourceImg, i * picWidth, 0, picWidth, sourceImg.height, 0, 0, cvsWidth, height);
                compressCtx.drawImage(smallCvs, i * cvsWidth, 0, cvsWidth, height);
            }
        } else {
            compressCtx.drawImage(sourceImg, 0, 0, sourceImg.width, sourceImg.height, 0, 0, width, height);
        }
        // 将canvas转换成base64
        return compressCvs.toDataURL('image/jpeg', quality / 100);
    }

    getFileSize(dataUrl) {
        dataUrl = dataUrl.substring(22);
        const equalIndex = dataUrl.indexOf('=');
        if (dataUrl.indexOf('=') > 0) {
            dataUrl = dataUrl.substring(0, equalIndex);
        }
        const strLength = dataUrl.length;
        const fileLength = strLength - (strLength / 8) * 2;
        return fileLength;
    }

    setPreview(ent, entrance, fileList) {
        this.dataService.showSpinner();
        return new Promise(resolve => {
            entrance.forEach(item => {
                if (item.id === ent) {
                    let i = 0;
                    const load = (item1, file) => {
                        if (!(file.type === 'image/jpeg' ||
                            file.type === 'image/png' || file.type === 'image/gif')) {
                            file = null;
                            i = i + 1;
                            if (fileList[i])
                                load(item1, file);
                            else {
                                resolve(entrance);
                                this.dataService.hideSpinner();
                            }
                        }
                        const that = this;
                        this.dataService.readBlobAsDataURL(file, (dataUrl) => {
                            let quality = 100;
                            const fileSize = this.getFileSize(dataUrl);
                            if (fileSize > 1500 * 1024)
                                quality = 50;
                            else if (fileSize > 1000 * 1024)
                                quality = 80;
                            else if (fileSize > 800 * 1024)
                                quality = 90;
                            const image = new Image();
                            const name = file.name;
                            image.onload = () => {
                                let dataUrl1 = dataUrl;
                                if (file.type !== 'image/gif')
                                    dataUrl1 = that.compress(image, 1, quality);
                                item.showFileList.push({src: dataUrl1, w: image.width, h: image.height, name: name});
                                for (let j = 0; j < item.showFileList.length; j++) {
                                    item.showFileList[j].serialNumber = j;
                                }
                                i = i + 1;
                                if (fileList[i])
                                    load(item1, fileList[i]);
                                else {
                                    resolve(entrance);
                                    this.dataService.hideSpinner();
                                }
                            };
                            image.src = dataUrl;
                        });
                    };
                    if (fileList[i])
                        load(item, fileList[i]);
                    else {
                        resolve(entrance);
                        this.dataService.hideSpinner();
                    }
                }
            });
        });
    }

}