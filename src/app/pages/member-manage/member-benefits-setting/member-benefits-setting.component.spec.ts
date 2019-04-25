import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MemberBenefitsSettingComponent} from './member-benefits-setting.component';

describe('MemberBenefitsSettingComponent', () => {
    let component: MemberBenefitsSettingComponent;
    let fixture: ComponentFixture<MemberBenefitsSettingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MemberBenefitsSettingComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MemberBenefitsSettingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
