import {NbMenuItem} from '@nebular/theme';
import {DataService} from '../service/dataService';
import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class PagesMenu implements OnInit {

    MENU_ITEMS: NbMenuItem[] = [];

    constructor(private dataService: DataService) {
    }

    ngOnInit() {
    }

    getMenu() {
        const data = this.dataService.permissionData;
        this.MENU_ITEMS = [
            {
                title: '首页',
                icon: 'nb-home',
                link: '/pages/index',
                home: true,
            },
            {
                title: '首页管理',
                icon: 'nb-tables',
                target: 'INDEXSETTING',
                hidden: data.INDEXSETTING.hidden && data.AD.hidden,
                children: [
                    {
                        title: '广告位列表',
                        link: '/pages/index-manage/advertising-list',
                        hidden: data.AD.hidden,
                    },
                    {
                        title: '广告列表',
                        link: '/pages/index-manage/ad-list',
                        hidden: data.AD.hidden,
                    },
                    {
                        title: '推荐商品列表',
                        link: '/pages/index-manage/recommend-commodity',
                        hidden: data.GOODS.hidden,
                    },
                    // {
                    //     title: '活动入口列表',
                    //     link: '/pages/index-manage/activity-entrance',
                    // },
                    {
                        title: '特价商品列表',
                        link: '/pages/index-manage/special-offer',
                        hidden: data.GOODS.hidden,
                    },
                ],
            },
            {
                title: '商品管理',
                icon: 'nb-compose',
                hidden: data.GOODS.hidden,
                children: [
                    {
                        title: '商品列表',
                        link: '/pages/commodity-manage/commodity-list',
                        hidden: data.GOODS.hidden,
                    },
                    {
                        title: '仓库列表',
                        link: '/pages/commodity-manage/warehouse-list',
                        hidden: data.GOODS.hidden,
                    },
                ],
            },
            {
                title: '活动管理',
                icon: 'nb-grid-a-outline',
                hidden: data.ACTIVITY.hidden,
                children: [
                    {
                        title: '活动列表',
                        link: '/pages/activity-manage/activity-list',
                        hidden: data.ACTIVITY.hidden,
                    },
                    // {
                    //     title: '活动商品列表',
                    //     link: '/pages/activity-manage/activity-commodity-list',
                    // },
                ],
            },
            {
                title: '订单管理',
                icon: 'nb-compose',
                hidden: data.ORDER.hidden,
                children: [
                    {
                        title: '订单列表',
                        link: '/pages/order-manage/order-list',
                        hidden: data.ORDER.hidden,
                    },
                    {
                        title: '退款退货申请处理',
                        link: '/pages/order-manage/return-processing',
                        hidden: data.ORDER.hidden,
                    },
                ],
            },
            {
                title: '用户管理',
                icon: 'nb-person',
                hidden: data.USER.hidden,
                children: [
                    {
                        title: '用户列表',
                        link: '/pages/user-manage/user-list',
                        hidden: data.USER.hidden,
                    },
                    {
                        title: '商家列表',
                        link: '/pages/user-manage/seller-list',
                        hidden: data.USER.hidden,
                    },
                ],
            },
            {
                title: '会员管理',
                icon: 'nb-person',
                hidden: data.MEMBER.hidden,
                children: [
                    {
                        title: '会员列表',
                        link: '/pages/member-manage/member-list',
                        hidden: data.MEMBER.hidden,
                    }, {
                        title: '合伙人列表',
                        link: '/pages/member-manage/partner-list',
                        hidden: data.MEMBER.hidden,
                    }, {
                        title: '会员等级管理',
                        link: '/pages/member-manage/member-level-setting',
                        hidden: data.MEMBER.hidden,
                    },
                    // {
                    //     title: '会员权益管理',
                    //     link: '/pages/member-manage/member-benefits-setting',
                    //     hidden: data.MEMBER.hidden,
                    // },
                    {
                        title: '会员提成管理',
                        link: '/pages/member-manage/member-commission-setting',
                        hidden: data.MEMBER.hidden,
                    },
                    // {
                    //     title: '会员商品管理',
                    //     link: '/pages/member-manage/member-commodity-setting',
                    //     hidden: data.MEMBER.hidden,
                    // },
                ],
            },
            {
                title: '类目管理',
                icon: 'nb-list',
                hidden: data.CATEGORY.hidden,
                children: [
                    {
                        title: '类目列表',
                        link: '/pages/category-manage/category-manage',
                        hidden: data.CATEGORY.hidden,
                    },
                ],
            },
            {
                title: '资金管理',
                icon: 'nb-bar-chart',
                hidden: data.FUNDS.hidden,
                children: [
                    {
                        title: '用户账户余额',
                        link: '/pages/funds-manage/user-balance-list',
                        hidden: data.FUNDS.hidden,
                    },
                    {
                        title: '资金明细',
                        link: '/pages/funds-manage/funds-list',
                        hidden: data.FUNDS.hidden,
                    },
                    {
                        title: '结算明细(买家)',
                        link: '/pages/funds-manage/settlement-list',
                        hidden: data.FUNDS.hidden,
                    },
                    {
                        title: '结算明细(卖家)',
                        link: '/pages/funds-manage/settlement-seller-list',
                        hidden: data.FUNDS.hidden,
                    },
                    {
                        title: '退款明细',
                        link: '/pages/funds-manage/refund-list',
                        hidden: data.FUNDS.hidden,
                    },
                    {
                        title: '月结规则设置',
                        link: '/pages/funds-manage/monthly-setting',
                        hidden: data.FUNDS.hidden,
                    },
                ],
            },
            {
                title: '消息管理',
                icon: 'nb-email',
                hidden: data.MESSAGE.hidden,
                children: [
                    {
                        title: '消息列表',
                        link: '/pages/message-manage/message-list',
                        hidden: data.MESSAGE.hidden,
                    },
                ],
            }, {
                title: '系统配置',
                icon: 'nb-gear',
                hidden: data.BGINDEX.hidden,
                children: [
                    {
                        title: '后台用户管理',
                        link: '/pages/system-manage/system-user-list',
                        hidden: data.BGINDEX.hidden,
                    },
                ],
            },
        ];
        return this.MENU_ITEMS;
    }

}
