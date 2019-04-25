import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MemberCommoditySettingComponent} from './member-commodity-setting.component';

describe('MemberCommoditySettingComponent', () => {
    let component: MemberCommoditySettingComponent;
    let fixture: ComponentFixture<MemberCommoditySettingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MemberCommoditySettingComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MemberCommoditySettingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
