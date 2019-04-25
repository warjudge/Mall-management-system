import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LocalDataSource} from 'ng2-smart-table';
import {SmartTableService} from '../../../@core/data/smart-table.service';
import {DataService} from '../../../service/dataService';

@Component({
    selector: 'ngx-add-seller',
    templateUrl: './add-seller.component.html',
    styleUrls: ['./add-seller.component.scss'],
})
export class AddSellerComponent implements OnInit {

    fileList: FileList;
    showFileList: any = [];
    modalHeader: any = '';
    rowData: any;

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

    settings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        hideSubHeader: true,
        pager: {
            perPage: 5,
        },
        columns: {
            user: {
                title: '操作人',
                type: 'string',
                editable: false,
            },
            module: {
                title: '操作模块',
                type: 'string',
                editable: false,
            },
            behavior: {
                title: '操作行为',
                type: 'string',
                editable: false,
            },
            time: {
                title: '时间',
                type: 'string',
                editable: false,
            },
        },
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(private activeModal: NgbActiveModal,
                private service: SmartTableService,
                private dataService: DataService) {
        const data = this.service.getData();
        this.source.load(data);

    }

    closeModal() {
        this.activeModal.close();
    }

    ngOnInit() {
    }

    onDeleteConfirm(e) {
    }

}
