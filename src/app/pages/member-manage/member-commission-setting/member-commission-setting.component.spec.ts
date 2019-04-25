import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MemberCommissionSettingComponent} from './member-commission-setting.component';

describe('MemberCommissionSettingComponent', () => {
    let component: MemberCommissionSettingComponent;
    let fixture: ComponentFixture<MemberCommissionSettingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MemberCommissionSettingComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MemberCommissionSettingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
