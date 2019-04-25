import {Component, Input, OnInit} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';


@Component({
    template: `
     <table >
  <tr>
    <th>商品类目</th>
    <th>商品单价</th>
    <th>购买数量</th>
    <th>商品总价</th>
  </tr>
  <tr>
    <td>January</td>
    <td>$100</td>
  </tr>
</table>
  `,
})
export class CustomCommodityComponent implements ViewCell, OnInit {

    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    data1 = [{
        id: 1,
        firstName: 'Mark',
        lastName: 'Otto',
        username: '@mdo',
        email: 'mdo@gmail.com',
        age: '28',
        option: '12',
    }, {
        id: 2,
        firstName: 'Jacob',
        lastName: 'Thornton',
        username: '@fat',
        email: 'fat@yandex.ru',
        age: '45',
    }, {
        id: 3,
        firstName: 'Larry',
        lastName: 'Bird',
        username: '@twitter',
        email: 'twitter@outlook.com',
        age: '18',
    }];


    ngOnInit() {
        this.renderValue = this.value.toString().toUpperCase();
    }

}