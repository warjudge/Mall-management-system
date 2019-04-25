import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DataService} from '../../../../service/dataService';

@Component({
    selector: 'ngx-special-offer-modal',
    templateUrl: './special-offer-modal.component.html',
    styleUrls: ['./special-offer-modal.component.scss'],
})
export class SpecialOfferModalComponent implements OnInit {

    fileList: FileList;
    showFileList: any = [];
    modalHeader: any = '';

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

    isEdit: any = false;

    constructor(private activeModal: NgbActiveModal,
                private dataService: DataService) {
    }

    closeModal() {
        this.activeModal.close();
    }

    goToEdit() {
        this.isEdit = true;
    }

    ngOnInit() {
    }

}
