import {Component, OnInit} from '@angular/core';
import {OrderListModalComponent} from '../../order-manage/order-list/order-list-modal/order-list-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddCategoryComponent} from '../add-category/add-category.component';
import {DataService} from '../../../service/dataService';
import {NbDialogService} from '@nebular/theme';
import {AlertComponent} from '../../modal-overlays/dialog/alert/alert.component';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'ngx-category-manage',
    templateUrl: './category-manage.component.html',
    styleUrls: ['./category-manage.component.scss'],
})
export class CategoryManageComponent implements OnInit {

    list = {
        id: 'null',
        name: '商品类目',
        frontName: '商品类目',
        icon: 'root',
        show: true,
        categorys: [],
    };
    listLast = {
        id: 'null',
        name: '商品类目',
        frontName: '商品类目',
        icon: 'root',
        show: true,
        categorys: [],
    };
    listForTrans: any;
    icon: any = 'flip-2';

    constructor(private modalService: NgbModal,
                public dataService: DataService,
                private dialogService: NbDialogService,
                private toast: ToastrService,
    ) {

    }

    ngOnInit() {
        this.init('')
    }

    init(temp) {
        this.dataService.sendRequest({
            action: 'getCategory',
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    if (this.list.categorys.length > 0) {
                        let t = JSON.stringify(this.list);
                        this.listLast = JSON.parse(t);
                    }
                    this.list.categorys = callData.list;
                    this.dataInit(this.list.categorys, this.listLast.categorys, temp);
                    this.listForTrans = JSON.parse(JSON.stringify(this.list));
                }
            }
        }).catch(() => {
            // console.log(err)
        });
    }


    refresh() {
        this.init('noRefresh');
    }

    dataInit(list, listLast, temp) {
        let that = this;
        console.log(listLast)
        if (listLast.length > 0) {
            const s = function (tree, treeLast) {
                for (let i = 0; i < tree.length; i++) {
                    if (tree[i].categorys && tree[i].categorys.length > 0) {
                        tree[i].show = false;
                        that.searchOne(tree[i], treeLast).then(res => {
                            tree[i].show = res['show'];
                            s(tree[i].categorys, treeLast);
                        }).catch(err => {
                            tree[i].show = false;
                            s(tree[i].categorys, treeLast);
                        })
                    } else {
                        tree[i].show = true;
                    }
                }
            };
            s(list, listLast);
        } else {
            const s = function (tree) {
                for (let i = 0; i < tree.length; i++) {
                    if (tree[i].categorys && tree[i].categorys.length > 0) {
                        tree[i].show = false;
                        s(tree[i].categorys);
                    } else {
                        tree[i].show = true;
                    }
                }
            };
            s(list);
        }
    }

    searchOne(data, tempList) {
        return new Promise((resolve, reject) => {
            const s = function (list, data1) {
                for (let i = 0; i < list.length; i++) {
                    if ((list[i].categoryName === data1.categoryName || data1.categoryName === '') &&
                        (list[i].frontName === data1.frontName || data1.frontName === '') &&
                        (list[i].categoryCode === data1.categoryCode || data1.categoryCode === '')) {
                        resolve(list[i]);
                    } else if (list[i].categorys && list[i].categorys.length > 0) {
                        s(list[i].categorys, data1);
                    }
                }
            };
            s(tempList, data);
        });
    }


    showList(item) {
        if (item.categorys && item.categorys.length > 0) {
            // this.traversing(this.list.categorys, item.id).then(res => {
            //     res['show'] = !res['show'];
            // }).catch(err => {
            //
            // });
            item.show = !item.show;
        }
    }

    traversing(list, index) {
        return new Promise((resolve, reject) => {
            const s = function (tree, id) {
                for (let i = 0; i < tree.length; i++) {
                    if (tree[i].id === id) {
                        resolve(tree[i]);
                    } else if (tree[i].categorys && tree[i].categorys.length > 0) {
                        s(tree[i].categorys, id);
                    }
                }
                reject('error');
            };
            s(list, index);
        });
    }

    addChild(id, isMain) {
        const activeModal = this.modalService.open(AddCategoryComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: '',
        });
        activeModal.componentInstance.parentId = id;
        activeModal.componentInstance.modalHeader = '添加类目';
        if (isMain)
            activeModal.componentInstance.isMain = true;
        activeModal.result.then((confirm) => {
            if (confirm === 'success')
                this.init('noRefresh');
        });
    }

    editCategory(item) {
        const activeModal = this.modalService.open(AddCategoryComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: '',
        });
        activeModal.componentInstance.item = item;
        activeModal.componentInstance.modalHeader = '编辑类目';
        activeModal.result.then((confirm) => {
            if (confirm === 'success')
                this.init('noRefresh');
        });
    }


    del(id) {
        const confirm = this.dialogService.open(AlertComponent);
        confirm.componentRef.instance.message = '确认删除该类目？';
        confirm.onClose.subscribe(opt => {
            if (opt === 'confirm') {
                this.dataService.sendRequest({
                    action: 'delCategory',
                    id: id,
                }).then(res => {
                    if (res['serviceCall']) {
                        const callData = this.dataService.getCallData(res);
                        if (callData.result === 'success') {
                            this.toast.success('删除成功！');
                        } else {
                            this.toast.error(callData.msg);
                        }
                    }
                    this.init('noRefresh');
                }).catch(err => {
                    this.toast.error('删除失败！');
                });
            }
        });
    }


    showStaticModal() {
        const activeModal = this.modalService.open(OrderListModalComponent, {
            size: 'lg',
            backdrop: 'static',
            container: 'nb-layout',
            windowClass: 'customModal',
        });
    }

    onSubmit(e: NgForm) {
        const data = e.value;
        this.list = {
            id: 'null',
            name: '商品类目',
            frontName: '商品类目',
            icon: 'root',
            show: true,
            categorys: [],
        };
        // this.searchCategory(data).then (res => {
        //     this.closeAll();
        //     this.openOne(res['id']);
        // }).catch(err => {
        //     console.log(err);
        //     this.toast.error('无搜索结果');
        // });
        this.searchCategory(data);
        this.closeAll();
        // this.openOne(res['id']);
    }

    searchCategory(data) {

        const that = this;
        const s = function (list, data1) {
            for (let i = 0; i < list.length; i++) {
                if ((list[i].categoryName === data1.categoryName || data1.categoryName === '') &&
                    (list[i].frontName === data1.frontName || data1.frontName === '') &&
                    (list[i].categoryCode === data1.categoryCode || data1.categoryCode === '')) {
                    that.list.categorys.push(list[i]);
                } else if (list[i].categorys && list[i].categorys.length > 0) {
                    s(list[i].categorys, data1);
                }
            }
        };
        s(this.listForTrans.categorys, data);
    }


    closeAll() {
        const s = function (list) {
            for (let i = 0; i < list.length; i++) {
                list[i].show = false;
                // console.log(1);
                if (list[i].categorys && list[i].categorys.length > 0) {
                    s(list[i].categorys);
                }
            }
        };
        s(this.list.categorys);
    }

    openOne(id) {
        if (id === 'null') {
            return;
        }
        const that = this;
        return new Promise((resolve, reject) => {
            const s = function (list, data1) {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].id === data1) {
                        list[i].show = true;
                        if (list[i].parentId && list[i].parentId !== 'null') {
                            s(that.list.categorys, list[i].parentId);
                        } else {
                            resolve('success');
                        }
                    } else if (list[i].categorys && list[i].categorys.length > 0) {
                        s(list[i].categorys, data1);
                    }
                }
                reject('error');
            };
            s(this.list.categorys, id);
        });
    }

    onChange(e, data) {
        this.dataService.sendRequest({
            action: 'editCategory',
            id: data.id,
            categoryName: data.categoryName,
            frontName: data.frontName,
            categoryCode: data.categoryCode,
            recommend: '' + e,
        }).then(res => {
            if (res['serviceCall']) {
                const callData = this.dataService.getCallData(res);
                if (callData.result === 'success') {
                    this.toast.success('编辑成功！');
                } else {
                    this.toast.error(callData.msg);
                }
                this.init('noRefresh');
            }
        }).catch(() => {
            this.toast.error('网络错误，请重试！');
        });
    }


}
